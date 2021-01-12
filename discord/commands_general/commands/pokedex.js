const Discord = require('discord.js')

const {discord, help} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = {
	name: 'pokedex',
	meta: help.get('commands_general', 'pokedex').value,
	cooldown: 5,
	execute(message, argv) {
	
		let args = argv._

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)

		//IF NO PARAM, SHOW HELP.
		if(args.length == 0){
			argv._.push('pokedex')
			const help_command = message.client.commands.find(cmd => cmd.name =='commands')
			help_command.execute(message, argv)
			return
		}
	
		// SEND POKEMON EMBED
		discord.embedPokemon(embed, args)
		message.channel.send(embed)

	} // EXECUTE

} // MODULE.EXPORTS