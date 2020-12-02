const Discord = require('discord.js');
const lowdb_raids = require('@models_lowdb/raids.js')

const {util} = require(`@core`)
const {colors, emoji} = require(`@config`).discord

module.exports = {
	name: 'codes',
	aliases: [],
	synopsis: 'List codes for raid.',
	description: 'List codes for people at this raid.',
	syntax: ['codes'],
	usage: {'To show codes:': 'codes'},
	show_help_footer: false,
	cooldown: 5,
	execute(message, argv) {

		let author = message.author

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		embed.setTitle('**Trainer Codes**')
		embed.setThumbnail(util.emoji_img('1234', {h: 25}).value)
		embed.setFooter(`${author.username}`, `${author.displayAvatarURL()}`)
		
		//let listTrainers = lowdb_raids.listTrainers(message.channel.id)
		let trainers_list = lowdb_raids.trainers_list(message.channel.id)

		if(trainers_list.count === 0){
			console.log('There are not trainers to list codes for.')
			embed.setColor(colors.caution)
			embed.setDescription('Whoops. Nobody has joined the raid yet.')
			message.channel.send(embed)
			return
		}

		embed.setDescription(
			//listTrainers.value.map(trainer => {
			trainers_list.value.map(trainer => {
				return '`' + util.trainerCodeFormat(trainer.code) + '` ' + emoji.blank + trainer.username
			})
		)

		message.channel.send(embed)

	}
}