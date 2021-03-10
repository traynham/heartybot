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
		let show = null

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)

		//HELP
		if(action && action.name === 'help'){
			const help_command = message.client.commands.find(cmd => cmd.name =='commands')
			argv._ = [this.name]
			help_command.execute(message, argv)
			return
		}
	
		if(action && ['charge', 'fast', 'perfect', 'type'].includes(action.name)){
			show = [action.name]
		}

		// SEND POKEMON EMBED
		discord.embedPokemon(embed, args, show)
		message.channel.send(embed)

	} // EXECUTE

} // MODULE.EXPORTS