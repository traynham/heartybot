const Discord = require('discord.js');
const lowdb_raids = require('@models_lowdb/raids.js')

const {util} = require(`@core`)
const {colors, trainer_states} = require(`@config`).discord

module.exports = {
	name: 'trainer_status',
	aliases: trainer_states.map(state => [state.state, ...state.aliases]).flat(),
	synopsis: 'Set your status',
	description: 'Set your status, such as omw, here, done, etc.',
	syntax: [trainer_states.map(state => state.state).join('/')],
	usage: {'Set status to "interested":': 'interested', 'Set status to "here":': 'here'},
	show_help_footer: false,
	cooldown: 5,
	execute(message, argv) {

		//let args = argv._
		let action = argv.command

		let state = trainer_states.find(state => state.state == action || state.aliases.includes(action))
		let author = message.author

		author.state = state.state

		//let updateTrainer = lowdb_raids.updateOrCreateTrainer(message.channel.id, author)
		let updateTrainer = lowdb_raids.trainers_updateOrCreate(message.channel.id, author)
		
		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.success)
		embed.setTitle(`Status set to "${state.value}"`)
		embed.setThumbnail(util.emoji_img(state.emoji, {h: 25}).value)
		embed.setFooter(`${author.username}`, `${author.displayAvatarURL()}`)
		message.channel.send(embed)
	
	}
}
