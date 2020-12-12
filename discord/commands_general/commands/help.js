const Discord = require('discord.js');

const {help, util} = require('@core')
const {prefix, colors, emoji} = require(`@config`).discord
//const config = require('@config')
const {domain} = require('@config')


module.exports = {
	name: 'help_bogus',
	aliases: ['h_bogus', 'commands_bogus', 'com_bogus', 'comm_bogus'],
	description: 'Help',
	cooldown: 5,
//	execute(message, args) {
	execute(message, argv) {

		let args = argv._
	/**
		Ideas:
			Link items to web page equivalent, such as commands on the general !!b view.
	**/
	
		// CREATE EMBED
		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)	
		
		// SHOW DEFAULT - COMMANDS LIST
		if(args.length == 0){
	
			let {values} = help.commands()
	
			embed.setTitle('**Commands**')
			//embed.setURL(`${config.main.domain}/help/commands`)
			embed.setURL(`${domain}/help/commands`)
		
			//embed.setDescription(`To view details on a command, use \`${config.main.prefix}${this.name} [command]\` For example, \`${config.main.prefix}${this.name} me\`.\n\u200B`)
			
			embed.setDescription(`To view details on a command, use \`${prefix}${this.name} [command]\` For example, \`${prefix}${this.name} me\`.\n\u200B`)

	
			embed.addField(
				'**Commands:**',
				values.map( value => `${emoji.blank}**${util.titleCase(value.name)}** › ${value.synopsis}` )
			)

			embed.setFooter('\u200B\n__________\u200B\n[] = Required, {} = Optional')
	
		}
	
		// SHOW COMMAND	
		if(args.length == 1){
	
			let {value: command, error, error_message} = help.command(args)
		
			console.log(command)

			if(error){
				embed.setColor(colors.error)
				embed.setTitle(`**Error**`)
				embed.setDescription(error_message)			
				embed.addField(
					'**Commands**',
					help.commands().values.map( item => ' › ' + item.name)
				)
			}

			if(!error){
				embed.setTitle(`**Command: ${util.titleCase(command.name)} **`)
				//embed.setURL(`${config.main.domain}/help/commands/${command.name}`)
				embed.setURL(`${domain}/help/commands/${command.name}`)

				embed.setDescription(
					`To view action details, use \`${prefix}${this.name} [${command.name}] [action]\` For example, \`${prefix}${this.name} ${command.name} ${Object.keys(command.actions)[1]}\`.\n\u200B`
				)
			
				embed.addField('**Syntax**', '`' + command.syntax + '`\n\u200B')
				embed.addField('**Default Action**', command.default.description_short + '\n\u200B')
			
				embed.addField(
					'**Actions**',
					Object.keys(command.actions).map( key => emoji.blank + '**' + command.actions[key].name + '** › ' + command.actions[key].synopsis)
				)
			
				embed.setFooter(`\u200B\n__________\u200B\nRevision: ${command.revision}\n\u200B [] = Required, {} = Optional`)
			
			}

	
		} // SHOW COMMAND
	
		// SHOW COMMAND ACTION
		if(args.length == 2){

	// NEED TO ADD ERROR CHECKING FOR BOGUS ACTIONS	

			//let {value: command, error, error_message} = help.command(args[0])
			let {value: command} = help.command(args[0])
		
		//	console.log('COMMAND: ', command)
	
			let action = help.command_action(args)
		
			let tip = action.value.tip ? `\n\n**Tip:**: ${action.value.tip}\n\u200B` : ''
		
			embed.setTitle(`**Commands: ${util.titleCase(command.name + ' ' + action.value.name)} **`)
			//embed.setURL(`${config.main.domain}/help/commands/${command.name}`)
			embed.setURL(`${domain}/help/commands/${command.name}`)
		
			embed.setDescription(action.value.description + tip)
		
			//embed.addField('**Syntax**', emoji.blank + '\`' + action.value.syntax + '\`\n\u200B')
			embed.addField('**Syntax**', emoji.blank + '`' + action.value.syntax + '`\n\u200B')
		
		
			embed.addField(
				'**Examples**',
				action.value.examples.map( example => emoji.blank + example.description + '\n' + emoji.blank + '`' + example.code + '`\n\u200B')
			)
		
			embed.setFooter('[] = Required, {} = Optional')
			
			console.log('has command, probably and an action, probably.')
	
		} // SHOW COMMAND ACTION
	
		// SEND MESSAGE
		message.channel.send(embed)

	} // EXECUTE

} // MODULE.EXPORTS