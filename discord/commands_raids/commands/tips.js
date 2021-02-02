const Discord = require('discord.js');
const tips = require('@data/tips.json')
const {help} = require(`@core`)

const {colors} = require(`@config`).discord

module.exports = {
	name: 'tip',
	meta: help.get('commands_raids', 'tips').value,
	aliases: ['tips'],
	synopsis: 'Show a tip.',
	description: 'Display a tip',
	//syntax: ['tip {category}'],
	syntax: ['tip'],
	usage: {'To show a tipe:': 'tip'},
	cooldown: 5,
	//execute(message, argv) {
	execute(message) {
	
		/**
			IDEAS:
			Only show "Raid Channel" tips.
			Ability to return a specific tip by name
		**/
		const random = tips[Math.floor(Math.random()*tips.length)];
	
		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		embed.setTitle(random.title)
		embed.setDescription(random.content)
		embed.setFooter(random.category)
		message.channel.send(embed)

	} // EXECUTE

} // MODULE.EXPORTS