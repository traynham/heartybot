const Discord = require('discord.js');

const {discord, pokedex, util} = require(`@core`)
const {colors, emoji} = require(`@config`).discord
const config = require(`@config`)

module.exports = {
	name: 'types',
	aliases: ['type', 't'],
	description: 'Get Pokemon Type Infos',
	cooldown: 5,
//	execute(message, args) {
	async execute(message, argv) {
	
//		(async () => {
		
			let args = argv._

			let type_images = config.general.pokemon.type_images

			// CREATE EMBED
			const embed = new Discord.MessageEmbed()
			embed.setColor(colors.primary)	

			// POST INFOGRAPHIC		
			if(args.length == 0){

				embed.setTitle('**Pokémon Types**')
				embed.setURL(`${config.main.domain}/infographics/types`)
			
				discord.setImage(embed, 'public/images/infographics/types.png', 'types.png')

			}

			// POST LISTING
			if(args.join('') == 'list'){
								
				let types = pokedex.type('all')

				embed.setTitle(`**Pokémon Go Types**`)
				embed.setURL(`${config.main.domain}/infographics/types`)
				embed.setDescription(
					//types.values.map( type => type.emoji + ' \u200B ' + util.titleCase(type.name) )
					types.rows.map( type => type.emoji + ' \u200B ' + util.titleCase(type.name) )
				)

			}

			// POST TYPE INFO
			if(args.length && !(args.join('') == 'list')){
			
				let type = pokedex.type(args)

				if(type.error){
				
					let types = pokedex.type('all')

					embed.setTitle(`**Error...**`)
					embed.setColor(colors.error)
					/*
					embed.setDescription(
						'Type not found. Use a type from blow: ' + '\n\u200B\n\u200B' +
						types.values.map( type => type.emoji + ' \u200B ' + util.titleCase(type.name) ).join('\n')
					)
					*/
					
					embed.setDescription(
						'Type not found. Use a type from blow: ' + '\n\u200B\n\u200B' +
						types.rows.map( type => type.emoji + ' \u200B ' + util.titleCase(type.name) ).join('\n')
					)

				} // IF ERROR
				
				if(!type.error){
					
					let items = ['super_effective', 'not_effective', 'resistant_to', 'weak_to']

					embed.setTitle(`**Type: ${util.titleCase(type.value.name)}**`)
					embed.setURL(`${config.main.domain}/infographics/types/${type.value.name}`)
				
					items.forEach(function(item){
						embed.addField(
							util.titleCase(item),
							type.value[item].toLowerCase().split(', ').map( type => emoji[type] ).join(' ') + '\n\u200B'
						)
					})

					embed.setThumbnail(`https://images.weserv.nl/?h=96&il&url=${type_images[type.value.name]}`)
					
				}
				
			}

			// SEND MESSAGE
			message.channel.send(embed)
			
//		})() // ASYNC
	} // EXECUTE

} // MODULE.EXPORTS