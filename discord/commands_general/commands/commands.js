const Discord = require('discord.js');

const {colors, emoji} = require(`@config`).discord
const {util} = require(`@core`)

module.exports = {
	name: 'commands',
	aliases: ['?', 'c', 'com', 'comm', 'command', 'h', 'help', 'man', 'opt', 'options'],
	description: 'View information about raid commands.',
	cooldown: 5,
	execute(message, argv) {
		
		console.log('ENTERING COMMANDS COMMAND')
		
		let args = argv._

		let command_set = 'commands'
		let commands = message.client[command_set]
		
		let user_roles = Array.from(message.member.roles.cache.values()).map(role => role.name.toLowerCase())
		
		console.log(user_roles)


		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		embed.setThumbnail(util.emoji_img('book', {h: 25}).value)

		const help_footer =	'__________\n' +
							'Items in [square brackets] are required.\n' +
							'Items in {curly brackets} are optional.'

		// IF ACTION REQUEST
		if(args.length > 1){
			console.log('ARGS::', args)		
			return
		}
		
		// COMMAND DETAIL
		if(args.length > 0){

			const commandName = args.join(' ')
			
			const command = commands.get(commandName) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))


			if(!command){
				console.log('NO COMMAND FOUND!!!! Prepare embed!!!')
				return
			}

			const help = command.help

			embed.setTitle(`HELP › **${help.name}**`)
			embed.setDescription(`${help.description}\n${emoji.spacer}`)
			
			if(help.aliases.length > 0) embed.addField('**Aliases**', help.aliases.join(', ') + `\n${emoji.spacer}\n`)

			if(help.actions.length > 0) {
				
				let actions = []
				
				help.actions.forEach(action => {
					if(action.roles && !user_roles.includes(action.roles[0])) { return }
					actions.push(action.name)
				})
				
				embed.addField('**Actions**', actions.join(', '))
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