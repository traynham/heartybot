const Discord = require('discord.js');

const {discord, pokedex} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = {
	name: 'pokedex',
	aliases: ['pokemon', 'mon', 'dex'],
	actions_su: ['update'],
	description: 'Get Pokemon Infos',
	cooldown: 5,
	execute(message, argv) {
	
		let args = argv._
		
		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		
		// EXIT EARLY IF ADMIN ACTION ATTEMPT BY NON-ADMIN.
		if(this.actions_su.includes(args[0]) && !discord.hasRole(message, 'su')){			
			embed.setColor(colors.error)
			embed.setDescription('Sorry, this action requires a su account.')
			message.channel.send(embed)
			return
		}
		
		// ACTION: UPDATE
		if(args[0] === 'update'){
			pokedex.update()
			embed.setColor(colors.success)
			embed.setDescription('Pokedex was updated. I mean it probably was anyway. You should probably double check.')
			message.channel.send(embed)
			return
		}
		
	
		// SEND POKEMON EMBED
		discord.embedPokemon(embed, args)
		message.channel.send(embed)

	} // EXECUTE

} // MODULE.EXPORTS