const Discord = require('discord.js')
const {colors} = require(`@config`).discord
const lowdb_raids = require('@models_lowdb/raids.js')
const dateFormat = require('dateformat');

module.exports = (message) => {
	
	console.log('entering raid list code.')	
	
	//let raids = lowdb_raids.listRaids()
	let raids = lowdb_raids.raids_list()
	
	//console.log(raids)

	let embed = new Discord.MessageEmbed()
	embed.setColor(colors.primary)	
	embed.setTitle('**Current Raids**')
	
	for (let raid of raids) {
		embed.addField(
			`**${raid.name}**`, 
			dateFormat(raid.time, 'shortTime') + ' ' + raid.boss
		)
	}

	embed.setFooter('Reported at ' + dateFormat(new Date(), 'shortTime'))	
	message.channel.send(embed)
	
}