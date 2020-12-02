const Discord = require('discord.js');
const lowdb_raids = require('@models_lowdb/raids.js')

const {util} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = {
	name: 'address',
	aliases: ['add', 'location', 'locate', 'coo', 'coord', 'coords', 'coordinates'],
	synopsis: 'Show gym location.',
	description: 'Show the address or coordinates for this raid gym.',
	syntax: ['address', 'coordinates'],
	usage: {'To show address:': 'address', 'To show coordinates:': 'coordinates'},
	show_help_footer: false,
	cooldown: 5,
	execute(message, argv) {
	
		//let args = argv._
		//let action = null

		//let raid = lowdb_raids.findRaid(message.channel.id)
		let raid = lowdb_raids.raids_find(message.channel.id)

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		
		if(['addr', 'address', 'location', 'locate'].includes(argv.command)){
			embed.addField(
				'**Address**',
				`[${raid.gym.address}](https://www.google.com/maps/search/${encodeURIComponent(raid.gym.address)} 'Get Directions')`
			)
			embed.setThumbnail(util.emoji_img('red_car', {h: 25}).value)
		}

		if(['coor', 'coord', 'coords', 'coordinates'].includes(argv.command)){
			embed.addField(
				'**Coordinates**',
				`[${raid.gym.coordinates}](https://www.google.com/maps/search/${encodeURIComponent(raid.gym.coordinates)} 'Get Directions')`
			)
			embed.setThumbnail(util.emoji_img('compass', {h: 25}).value)
		}

		message.channel.send(embed)
	
	}
};
