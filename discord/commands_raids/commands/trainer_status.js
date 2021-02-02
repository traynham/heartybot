const Discord = require('discord.js');
const lowdb_raids = require('@models_lowdb/raids.js')

const {help, util} = require(`@core`)
const {colors, trainer_states} = require(`@config`).discord

module.exports = {
	name: 'trainer_status',
	meta: help.get('commands_raids', 'trainer_status').value,
	execute(message, argv) {

		let action = argv.command

		let state = trainer_states.find(state => state.state == action || state.aliases.includes(action))
		let author = message.author

		author.state = state.state

		lowdb_raids.trainers_updateOrCreate(message.channel.id, author)

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.success)
		embed.setTitle(`Status set to "${state.value}"`)
		embed.setThumbnail(util.emoji_img(state.emoji, {h: 25}).value)
		embed.setFooter(`${author.username}`, `${author.displayAvatarURL()}`)
		message.channel.send(embed)
	
	}
}
