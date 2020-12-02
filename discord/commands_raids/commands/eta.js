const {isAfter, isBefore } = require('date-fns')
const dateFormat = require('dateformat')
const Discord = require('discord.js');

const lowdb_raids = require('@models_lowdb/raids.js')
const {colors} = require(`@config`).discord
const {detect, util} = require(`@core`)

module.exports = {
	name: 'eta',
	aliases: [],
	synopsis: 'Show/Set eta.',
	description: 'Show or set when you can arrive at the raid, IRL.',
	syntax: ['eta {time/duration}'],
	usage: {'Show eta:': 'eta', 'Set eta with duration:': 'eta 5m', 'Set eta with time': 'ends 5:05'},
	cooldown: 5,
	execute(message, argv) {
		
		let args = argv._
		let author = message.author

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		embed.setTitle('**Set ETA**')
		embed.setThumbnail(util.emoji_img('stopwatch', {h: 25}).value)
		embed.setFooter(`${author.username}`, `${author.displayAvatarURL()}`)

		//let raid = lowdb_raids.findRaid(message.channel.id)
		let raid = lowdb_raids.raids_find(message.channel.id)
		//let trainer = lowdb_raids.findTrainer(message.channel.id, author)
		let trainer = lowdb_raids.trainers_find(message.channel.id, author)
		//let isEgg = detect.isEgg(raid.boss).value
		let errorMsg = null

		// SHOW "NOT SET"
		if(args.length === 0 && !trainer.value.eta){
			embed.setDescription('You have not set your eta.')
			message.channel.send(embed)
			return
		}
		
		// SHOW ETA
		if(args.length === 0){
			embed.addField('**ETA**', dateFormat(trainer.value.eta, "h:MM TT"))
			message.channel.send(embed)
			return
		}

		let time = detect.time(args)
		if(time.error) time = detect.duration(args)

		// TIME NOT FOUND.
		if(time.error){
			errorMsg = 'Sorry, I could not find a time or duration.'
		}

		// IN PAST.
		if(isBefore(time.value, new Date()) ){
			errorMsg = 'Sorry, the time you entered has already happened.'
		}

		// AFTER RAID
		if(isAfter(time.value, new Date(raid.time)) ){
			errorMsg = 'Sorry, the time you entered is after the raid.'
		}

		// RETURN ERROR CARD.
		if(errorMsg){
			embed.setTitle('**Set ETA (Error)**')
			embed.setColor(colors.error)
			embed.setDescription(errorMsg)
			message.channel.send(embed)
			return
		}
		
		author.eta = time.value
		
		// UPDATE TRAINER
		//let updateTrainer = lowdb_raids.updateOrCreateTrainer(message.channel.id, author)
		let updateTrainer = lowdb_raids.trainers_updateOrCreate(message.channel.id, author)

		// SHOW CONFIRMATION MESSAGE
		embed.setTitle('**ETA (Updated)**')
		embed.setColor(colors.success)
		embed.addField('**ETA**', dateFormat(time.value, "h:MM TT"))
		message.channel.send(embed)

	}

}