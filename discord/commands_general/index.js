const Discord = require('discord.js')
const {discord} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = (client, message) => {

	var argv = require('yargs-parser')(message.content, {
		boolean: ['d', 'h', 's', 'u', 'v', 'debug', 'help'],
		configuration: {
			'short-option-groups': true
		}
	})

	// CHECK FOR HELP ARGUMENT
	if(argv.h || argv.help) argv._.unshift('help')
	
	// CHECK FOR HELP ACTION
	if(argv._[1] == 'help'){
		argv._.splice(1, 1)
		argv._.unshift('help')
	}

	const commandName = argv._.shift()

// cmd.aliases to be obsolete.

	const command = (
		client.commands.get(commandName) || 
		client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) ||
		client.commands.find(cmd => cmd.meta && cmd.meta.aliases && cmd.meta.aliases.includes(commandName))
	)
	
	if (!command) return;

	// ADD COOLDOWNS:
	// https://discordjs.guide/command-handling/adding-features.html#cooldowns

	//  COMMAND ROLE CHECK. CURRENT ONLY SUPPORTS ONE ROLE.	
	if(command.meta && command.meta.roles && command.meta.roles.length && !discord.hasRole(message, command.meta.roles[0])) {
		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.error)
		embed.setDescription('Sorry, you do not have permission to use this command.')
		message.channel.send(embed)
		return
	}
		
	if(command.meta && command.meta.actions){
		
		let actions = command.meta.actions

		let action = (
			actions.find(act => act.name == argv._[0] && act.enabled != false) ||
			actions.find(act => act.aliases && act.aliases.includes(argv._[0]) && act.enabled != false)
		)

		// IF NO ACTION AND NO PARAMS, LOCATE DEFAULT ACTION.
		if(!action && argv._.length == 0){ action = actions.find(act => act.default) }

		if(action) {
			argv.action = action
			argv._.shift()
		}
		
		//  ACTION ROLE CHECK. CURRENT ONLY SUPPORTS ONE ROLE.	
		if(action && action.roles && !discord.hasRole(message, action.roles[0])) {
			let embed = new Discord.MessageEmbed()
			embed.setColor(colors.error)
			embed.setDescription('Sorry, you do not have permission to use this action.')
			message.channel.send(embed)
			return
		}

	}
	
	try {
		command.execute(message, argv)
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
	
}