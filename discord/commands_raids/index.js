const Discord = require('discord.js')
const {colors, trainer_states_replacements} = require('@config').discord
const {discord} = require('@core')

module.exports = (client, message) => {
	
	let commandString = message.content.toLowerCase()
		
	// CHECK FOR FULL COMMAND REPLACEMENTS. (SINGLE COMMANDS WITH SPACES)
	let replacement = trainer_states_replacements.find(cmd => cmd.command == commandString)

	if(replacement) commandString = replacement.replace
	
	
	var argv = require('yargs-parser')(commandString, {
		boolean: ['d', 'h', 's', 'v', 'debug', 'help'],
		configuration: {
			'short-option-groups': true
		}
	})

	// CHECK FOR HELP ARGUMENT
	if(argv.h || argv.help) argv._.unshift('help')
	
	const commandName = argv._.shift()
	const args = argv._	
	
	// INSERT COMMANDNAME INTO ARGV AS "COMMAND"
	argv.command = commandName

// cmd.aliases to be obsolete.	
	const command = (
		client.raid_commands.get(commandName) ||
		client.raid_commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) ||
		client.raid_commands.find(cmd => cmd.meta && cmd.meta.aliases && cmd.meta.aliases.includes(commandName))
	)
	
	//  COMMAND ROLE CHECK. CURRENT ONLY SUPPORTS ONE ROLE.	
	if(command && command.meta && command.meta.roles && !discord.hasRole(message, command.meta.roles[0])) {
		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.error)
		embed.setDescription('Sorry, you do not have permission to use this command.')
		message.channel.send(embed)
		return
	}

	// SCAN FOR BOSSES HERE? AS IN, A BOSS ONLY CONTENT STRING. (AFTER RULING OUT ANY COMMANDS)
	// ACTUALLY, SCAN FOR OTHER STUFF ONCE EVERYTHING HAS BEEN PROCESSED.
	// THIS LIKELY MEANS THAT EACH COMMAND WILL NEED TO RETURN AN INDICATOR ON IT'S OWN SUCCESS.
	// MABYE `RETURN FALSE` COULD INDICATE THAT PROCESSING NEEDS TO STOP, 
	// OR `RETURN TRUE` COULD INDICATE THAT IT WAS SUCCESSFUL. YAY. TWO OPTIONS MEANING THE SAME.

	// RETURN IF COMMAND NOT FOUND
	if (!command) return;
	
	// IF ARGS ARE REQUIRED
	if (command.args && !args.length) {

		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	try {
		command.execute(message, argv)
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}

}