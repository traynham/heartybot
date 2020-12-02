const Discord = require('discord.js');

const lowdb_raids = require('@models_lowdb/raids.js')
const {colors} = require(`@config`).discord
const {util} = require(`@core`)

module.exports = {
	name: 'people',
	aliases: ['acc', 'account', 'accounts', 'p', 'ppl', 'peo', 'tra', 'trainer', 'trainers'],
	synopsis: 'Show/set people/accounts count.',
	description: 'Show or set how many people or accounts are raiding.',
	syntax: ['people {count}', 'accounts {count}'],
	usage: {'To show count:': 'people', 'To set count:': 'people 3'},
	show_help_footer: true,
	cooldown: 5,
	execute(message, argv) {

		let args = argv._
		//let action = argv.command
		let author = message.author
		let value = args[0]

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		embed.setTitle('**People Count**')
		embed.setThumbnail(util.emoji_img('busts_in_silhouette', {h: 25}).value)
		embed.setFooter(`${author.username}`, `${author.displayAvatarURL()}`)

		//let trainer = lowdb_raids.findTrainer(message.channel.id, author)
		let trainer = lowdb_raids.trainers_find(message.channel.id, author)

		// SHOW PEOPLE COUNT
		if(args.length === 0){
			embed.setDescription(`Your people count is ${trainer.value.people}`)
			message.channel.send(embed)
			return
		}

		// SHOW INVALID VALUE
		if( !Number.isInteger(value) || value > 9 || value < 1 ){
			embed.setColor(colors.error)
			embed.setTitle('**ERROR: People Count**')
			embed.setDescription('People count must be a number from 1-9.')
			message.channel.send(embed)
			return
		}

		// UPDATE TRAINER
		author.people = value
		//let updateTrainer = lowdb_raids.updateOrCreateTrainer(message.channel.id, author)
		let updateTrainer = lowdb_raids.trainers_updateOrCreate(message.channel.id, author)

		// SHOW SUCCESS
		embed.setColor(colors.success)
		embed.setTitle('**People Count**')
		embed.setDescription(`Your People count was set to ${value}`)
		message.channel.send(embed)

	}

}