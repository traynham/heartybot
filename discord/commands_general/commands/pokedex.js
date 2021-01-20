const Discord = require('discord.js')

const {discord, help} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = {
	name: 'pokedex',
	meta: help.get('commands_general', 'pokedex').value,
	cooldown: 5,
	execute(message, argv) {
	
		let args = argv._
		let action = (argv.action ? argv.action : null)

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)

		//HELP
		if(action && action.name === 'help'){
			const help_command = message.client.commands.find(cmd => cmd.name =='commands')
			argv._ = [this.name]
			help_command.execute(message, argv)
			return
		}
	
		// SEND POKEMON EMBED
		discord.embedPokemon(embed, args)
		message.channel.send(embed)

	} // EXECUTE

} // MODULE.EXPORTS