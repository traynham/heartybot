const Discord = require('discord.js');
const lowdb_raids = require('@models_lowdb/raids.js')

const {help, util} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = {
	name: 'address',
	meta: help.get('commands_raids', 'address').value,
	cooldown: 5,
	execute(message) {

		let raid = lowdb_raids.raids_find(message.channel.id)

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
	
		if(raid.gym.address){

			embed.addField(
				'**Address**',
				`[${raid.gym.address}](https://www.google.com/maps/search/${encodeURIComponent(raid.gym.address)} 'Get Directions')`
			)

			embed.setThumbnail(util.emoji_img('red_car', {h: 25}).value)

			message.channel.send(embed)

			return

		}

		if(raid.gym.coordinates){

			embed.addField(
				'**Coordinates**',
				`[${raid.gym.coordinates}](https://www.google.com/maps/search/${encodeURIComponent(raid.gym.coordinates)} 'Get Directions')`
			)
			embed.setThumbnail(util.emoji_img('compass', {h: 25}).value)


			message.channel.send(embed)

			return

		}
	
		embed.setColor(colors.primary)
		embed.addField('**Whoops**', 'This gym appears to have no address and no coordinates.')
		embed.setThumbnail(util.emoji_img('shrug', {h: 25}).value)
		message.channel.send(embed)
	
	}
};
