const fs = require('fs')
const { name, author, version } = require('../package.json')

const lowdb_raids = require('@models_lowdb/raids.js')

const Discord = require('discord.js')
const client = new Discord.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'] })
const {jeeves, mode, prefix, prefix_help} = require(`@config`).discord

client.config = { prefix: prefix }

var cron = require('node-cron')

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
	const command = require(`./commands_raids/commands/${file}`)
	client.raid_commands.set(command.name, command);
}

//NEED TO STORE COOLDOWNS IN CLIENT OBJECT
//const cooldowns = new Discord.Collection();


// ON READY (FIRST TIME)
client.once('ready', () => {
	console.log('===============================================================')
	console.log(`   I am ready! ${name} ${version} by ${author}`)
	console.log(`   ${new Date()}`)
	console.log(`   Prefix is "${prefix}"`)
	console.log('===============================================================')
	client.user.setActivity('...type !h for help.');
})


// ON ERROR
client.on('error', error => {
	console.error('Discord Error:', error)
})

if(mode === 'dev'){
	
	// ON Warn
	client.on('warn', warn => {
		console.error('Discord Warning:', warn)
	})
	
	// ON Debug
	client.on('debug', debug => {
		console.error('Discord Debug:', debug)
	})

} // IF DEV MODE

process.on('unhandledRejection', error => {
	console.error('Unhandled promise rejection:', error)
})


// ON MESSAGE
client.on('message', message => {

	// SET CONTENT TO LOWERCASE.
	message.content_original = message.content
	message.content = message.content.toLowerCase()
	let isRaidChannel = false
//	let isRaidTrain = false

	if(lowdb_raids.raids_find(message.channel.id)){
		isRaidChannel = true
	}
	
	if(message.content.startsWith(prefix_help)) {
		message.content = `help ${message.content.slice(prefix_help.length)}`
	}

	if(isRaidChannel) {
		raid_commands(client, message)
		return
	}

	if (message.author.bot) return;
	
	if(message.content.startsWith(prefix)) {
		message.content = message.content.slice(prefix.length)
		commands_general(client, message)
		return
	}
	
	if(message.content.startsWith('help')) {
		commands_general(client, message)
		return
	}

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

//client.login(token)


	//const run_jeeves = true

	//if(run_jeeves){
	if(jeeves){
		const jeeves = require('./jeeves')
		//cron.schedule('*/1 * * * *', () => { jeeves(client) });
		cron.schedule('*/1 6-21 * * *', () => { jeeves(client) });
	}

module.exports = client