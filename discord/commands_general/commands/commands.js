const Discord = require('discord.js');

const {colors, emoji} = require(`@config`).discord
const {util} = require(`@core`)

module.exports = {
	name: 'commands',
	aliases: ['?', 'c', 'com', 'comm', 'command', 'h', 'help', 'man', 'opt', 'options'],
	description: 'View information about raid commands.',
	cooldown: 5,
	execute(message, argv) {
		
		let args = argv._
		//let action = argv.command
		//let author = message.author

		//const { raid_commands } = message.client
		const { commands: commands_general } = message.client
//console.log(commands_general)
		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		embed.setThumbnail(util.emoji_img('book', {h: 25}).value)

		const help_footer =	'__________\n' +
							'Items in [square brackets] are required.\n' +
							'Items in {curly brackets} are optional.'

		// COMMAND DETAIL
		if(args.length > 0){

			const commandName = args.join(' ')
			
			//const command = raid_commands.get(commandName) || raid_commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

			const command = commands_general.get(commandName) || commands_general.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

			embed.setTitle(`**${command.name} (Raid Command)**`)
			embed.setDescription(`${command.description}\n${emoji.spacer}`)
			
			if(command.aliases.length > 0) embed.addField('**Aliases**', command.aliases.join(', ') + `\n${emoji.spacer}\n`)
			
			if(command.syntax) embed.addField('**Syntax**', command.syntax.join('\n') + `\n${emoji.spacer}`)
			
			if(command.usage){
				let usage = Object.entries(command.usage).map(entry => {
					return	`_${entry[0]}_\n` + emoji.blank + '`' + entry[1] + '`' + `\n${emoji.spacer}`
				})	
				embed.addField('**Usage**', usage)
			}

			if(command.show_help_footer){embed.setFooter(help_footer)}

			return message.channel.send(embed)

		}

		// COMMAND LIST
		embed.setTitle('**Raid Command List**')
		
		const data = []
		
		//data.push('Use `help [command name]` for more details, for example, `command boss`.\n');
		data.push('Use `?[command name]` for more details, for example, `?boss`.\n');

		//raid_commands.map(command => {
		commands_general.map(command => {
			data.push(`**${command.name}**: ${command.synopsis}`)
		})

		embed.setDescription(data)
		embed.setFooter(help_footer)
		
		return message.channel.send(embed)
		
	
	} // EXECUTE
}