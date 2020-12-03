const fs = require('fs')
const { name, author, version } = require('../package.json')

const lowdb_raids = require('@models_lowdb/raids.js')

const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const {prefix, token} = require(`@config`).discord

client.config = { prefix: prefix }


// COMMANDS - GENERAL
const commands_general = require('./commands_general')

client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./discord/commands_general/commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const command = require(`./commands_general/commands/${file}`);
	client.commands.set(command.name, command);
}


// RAID COMMANDS
const raid_commands = require('./commands_raids')

client.raid_commands = new Discord.Collection()
const raid_command_files = fs.readdirSync('./discord/commands_raids/commands').filter(file => file.endsWith('.js'))

for (const file of raid_command_files) {
	const command = require(`./commands_raids/commands/${file}`);
	client.raid_commands.set(command.name, command);
}

//NEED TO STORE COOLDOWNS IN CLIENT OBJECT
//const cooldowns = new Discord.Collection();


// ON READY (FIRST TIME)
client.once('ready', () => {
	console.log(`I am ready! ${name} ${version} by ${author}\n${new Date()}`)
	client.user.setActivity('...type !h for help.');
})


// ON ERROR
client.on('error', error => {
	console.error('Discord Error:', error)
})

/** @todo Only do warn and debug in dev mode */
// ON Warn
client.on('warn', warn => {
	console.error('Discord Warning:', warn)
})

// ON Debug
client.on('debug', debug => {
	console.error('Discord Debug:', debug)
})

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error)
})


// ON MESSAGE
client.on('message', message => {

//console.log(message.channel.id)
//console.log(message.channel.name)

/*
	if(message.channel.id == 743605545059090503 && !message.author.bot){
		console.log('garbage channel - in on "message"')
	}
*/
	// TESTING WITH JUST DM FOR NOW...
//	if(!(message.channel.type === 'dm')) return;

	// THESE TWO VARS TBD ONCE DB STRUCTURE IS IN PLACE
	//var isRaidChannel = true
	var isRaidChannel = false
	var isRaidTrain = false



//	console.log('HERE\'S MY CHANNEL ID, DERP: ', message.channel.id)
	
//	console.log('IS RAID CHANNEL? ', lowdb_raids.findRaid(message.channel.id))
	
	//if(lowdb_raids.findRaid(message.channel.id)){
	if(lowdb_raids.raids_find(message.channel.id)){
		isRaidChannel = true
	}
	

	if(isRaidChannel) {
		raid_commands(client, message)
		//return
	}

	// EXIT EARLY IF NOT A BOT COMMAND OR IF AUTHOR IS BOT
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	commands_general(client, message)
	
})


// ON MESSAGE UPDATE
client.on('messageUpdate', (oldMessage, message) => {

	// EXIT IF NOT A COMMAND
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	
	commands_general(client, message)

})


// OTHER EVENTS

client.on('disconnect', () => { console.warn('Disconnected!'); })

client.on('reconnecting', () => { console.warn('Reconnecting...'); })

/*
// REQUIRES PARTIALS
client.on('messageReactionAdd', async (reaction, user) => {
	// When we receive a reaction we check if the reaction is partial or not
	if (reaction.partial) {
		// If the message this reaction belongs to was removed the fetching might result in an API error, which we need to handle
		try {
			await reaction.fetch();
		} catch (error) {
			console.log('Something went wrong when fetching the message: ', error);
			// Return as `reaction.message.author` may be undefined/null
			return;
		}
	}
	// Now the message has been cached and is fully available
	console.log(`${reaction.message.author}'s message "${reaction.message.content}" gained a reaction!`);
	// The reaction is now also fully available and the properties will be reflected accurately:
	console.log(`${reaction.count} user(s) have given the same reaction to this message!`);
});
*/

client.login(token)