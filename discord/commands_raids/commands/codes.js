const Discord = require('discord.js');
const lowdb_raids = require('@models_lowdb/raids.js')

const {help, util} = require(`@core`)
const {colors, emoji} = require(`@config`).discord

module.exports = {
	name: 'codes',
	meta: help.get('commands_raids', 'codes').value,
	execute(message) {

		let author = message.author

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		embed.setTitle('**Trainer Codes**')
		embed.setThumbnail(util.emoji_img('1234', {h: 25}).value)
		embed.setFooter(`${author.username}`, `${author.displayAvatarURL()}`)
		
		let trainers_list = lowdb_raids.trainers_list(message.channel.id)

		if(trainers_list.count === 0){
			console.log('There are not trainers to list codes for.')
			embed.setColor(colors.caution)
			embed.setDescription('Whoops. Nobody has joined the raid yet.')
			message.channel.send(embed)
			return
		}

		embed.setDescription(
			trainers_list.value.map(trainer => {
				return '`' + util.trainerCodeFormat(trainer.code) + '` ' + emoji.blank + trainer.username
			})
		)

		message.channel.send(embed)

	}
}