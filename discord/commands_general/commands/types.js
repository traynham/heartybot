const Discord = require('discord.js');

const {discord, help, pokedex, util} = require(`@core`)
const {colors, emoji} = require(`@config`).discord
const config = require(`@config`)

module.exports = {
	name: 'types',
	meta: help.get('commands_general', 'types').value,
	cooldown: 5,
	async execute(message, argv) {
	
		let args = argv._
		let action = (argv.action ? argv.action : null)

		let type_images = config.general.pokemon.type_images

		// CREATE EMBED
		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)	

		// POST INFOGRAPHIC		
		if(action && action.name == 'infographic'){
			embed.setTitle('**Pokémon Types**')
			embed.setURL(`${config.main.domain}/infographics/types`)		
			discord.setImage(embed, 'public/images/infographics/types.png', 'types.png')
			message.channel.send(embed)
			return
		}

		// POST LISTING
		if(action && action.name == 'list'){
			let types = pokedex.type('all')
			let desc = types.rows.map( type => type.emoji + ' \u200B ' + util.titleCase(type.name) )
			embed.setTitle(`**Pokémon Go Types**`)
			embed.setURL(`${config.main.domain}/infographics/types`)
			embed.setDescription(desc)
			message.channel.send(embed)
			return
		}

		// POST TYPE INFO
		let type = pokedex.type(args)
		
		// IF TYPE ERROR
		if(type.error){
			let types = pokedex.type('all')
			embed.setTitle(`**Error...**`)
			embed.setColor(colors.error)
			embed.setDescription(
				'Type not found. Use a type from blow: ' + '\n\u200B\n\u200B' +
				types.rows.map( type => type.emoji + ' \u200B ' + util.titleCase(type.name) ).join('\n')
			)
			message.channel.send(embed)
			return
		} // IF ERROR

		// TYPE DETAIL
		embed.setTitle(`**Type: ${util.titleCase(type.value.name)}**`)
		embed.setURL(`${config.main.domain}/infographics/types/${type.value.name}`)
	
		let items = ['super_effective', 'not_effective', 'resistant_to', 'weak_to']
		items.forEach(function(item){
			embed.addField(
				util.titleCase(item),
				type.value[item].toLowerCase().split(', ').map( type => emoji[type] ).join(' ') + '\n\u200B'
			)
		})

		embed.setThumbnail(`https://images.weserv.nl/?h=96&il&url=${type_images[type.value.name]}`)

		// SEND MESSAGE
		message.channel.send(embed)

	} // EXECUTE

} // MODULE.EXPORTS