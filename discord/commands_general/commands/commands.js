const Discord = require('discord.js');

const {colors, emoji} = require(`@config`).discord
const {util} = require(`@core`)

module.exports = {
	name: 'commands',
	aliases: ['?', 'c', 'com', 'comm', 'command', 'h', 'help', 'man', 'opt', 'options'],
	description: 'View information about raid commands.',
	cooldown: 5,
	execute(message, argv) {
		
		/*
			TODO:
			* IF ACTION, ADD HELP FOR GETTING ACTION HELP.
			* ALSO: Move to core/discord as a function so it can be used from raid commands too.
		*/
		
		let args = argv._

		let command_set = 'commands'
		let commands = message.client[command_set]
		
		let user_roles = Array.from(message.member.roles.cache.values()).map(role => role.name.toLowerCase())
		
		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		embed.setThumbnail(util.emoji_img('book', {h: 25}).value)

		const help_footer =	'__________\n' +
									'Items in [square brackets] are required.\n' +
									'Items in {curly brackets} are optional.'

		const commandName = args[0]
		
		const command = commands.get(commandName) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
	
		const help = command.help
		
		// IF COMMAND IS NOT FOUND, BUT REQUESTED.
		if(args.length > 0 && !command){
			embed.setTitle(`**HELP ERROR**`)
			embed.setColor(colors.error)
			embed.setDescription('Sorry. There is no help for that command.  Perhaps there was a mispeeling.')
			return message.channel.send(embed)
		}

		// IF ACTION REQUEST
		if(args.length > 1){

			let requested_action = args[1]
			
			let action = help.actions.find(action =>
					action.name == requested_action || 
					(action.aliases && action.aliases.includes(requested_action))
			)
			
			embed.setTitle(`**HELP › ${help.name} › ${action.name}**`)
			embed.setDescription(`${action.description}\n${emoji.spacer}`)
			
			if(action.aliases.length) {
				embed.addField('**Aliases**', action.aliases.join(', '))
			}

			if(action.examples){
				let examples = Object.entries(action.examples).map(entry => {
					return	`_${entry[0]}_\n` + emoji.blank + '`' + entry[1] + '`' + `\n${emoji.spacer}`
				})	
				console.log('HERE::', examples)
				embed.addField('**Examples**', examples)
			}

			message.channel.send(embed)
			return
		}
		
		// COMMAND DETAIL
		if(args.length > 0){

			embed.setTitle(`HELP › **${help.name}**`)
			embed.setDescription(`${help.description}\n${emoji.spacer}`)
			
			if(help.aliases.length > 0) embed.addField('**Aliases**', help.aliases.join(', ') + `\n${emoji.spacer}\n`)

			embed.addField('**Default**', help.default.description + `\n${emoji.spacer}`)

			if(help.actions.length > 0) {
				
				let actions = []
				
				help.actions.forEach(action => {
					if(action.roles && !user_roles.includes(action.roles[0])) { return }
					actions.push(action.name)
				})
				
				embed.addField('**Actions**', actions.join(', ') + `\n${emoji.spacer}`)
			}
			
			if(help.syntax) embed.addField('**Syntax**', help.syntax.join('\n') + `\n${emoji.spacer}`)

			if(help.usage){
				let usage = Object.entries(help.usage).map(entry => {
					return	`_${entry[0]}_\n` + emoji.blank + '`' + entry[1] + '`' + `\n${emoji.spacer}`
				})	
				embed.addField('**Usage**', usage)
			}

			if(help.show_help_footer){embed.setFooter(help_footer)}

			return message.channel.send(embed)

		}

		// COMMAND LIST
		embed.setTitle('**Command List**')
		
		const data = []
		
		data.push('Use `?[command name]` for more details, for example, `?boss`.\n');

		commands.map(command => {
			data.push(`**${command.name}**: ${command.synopsis}`)
		})

		embed.setDescription(data)
		embed.setFooter(help_footer)
		
		return message.channel.send(embed)
		
	
	} // EXECUTE
}