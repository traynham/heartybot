const {isAfter, isBefore } = require('date-fns')
const dateFormat = require('dateformat')
const Discord = require('discord.js');
const lowdb_raids = require('@models_lowdb/raids.js')

const {colors} = require(`@config`).discord
const {detect, discord, help, util} = require(`@core`)

module.exports = {
	name: 'pull',
	meta: help.get('commands_raids', 'pull').value,
	execute(message, argv) {
		
		let args = argv._
		let author = message.author
		let raid = lowdb_raids.raids_find(message.channel.id)
		let errorMsg = null

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		embed.setTitle('**Pull Time**')
		embed.setThumbnail(util.emoji_img('firecracker', {h: 25}).value)
		embed.setFooter(`${author.username}`, `${author.displayAvatarURL()}`)

		// NOT YET SET
		if(args.length === 0 && !raid.pull){
			embed.setDescription('Pull Time has not been set..')
			message.channel.send(embed)
			return
		}

		// SHOW PULL
		if(args.length === 0){
			embed.addField('**Pull Time**', dateFormat(raid.pull, "h:MM TT"))
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

		// BEFORE HATCH
		if(isBefore(time.value, new Date(raid.hatches)) ){
			errorMsg = `Sorry, the time you entered is before the egg hatches.`
		}

		// AFTER RAID
		if(isAfter(time.value, new Date(raid.time)) ){
			errorMsg = 'Sorry, the time you entered is after the raid.'
		}

		// RETURN ERROR CARD.
		if(errorMsg){
			embed.setTitle('**Set Pull Time (Error)**')
			embed.setColor(colors.error)
			embed.setDescription(errorMsg)
			message.channel.send(embed)
			return
		}

		// UPDATE RAID
		lowdb_raids.raids_update(message.channel.id, 'pull', time.value)

		// SHOW CONFIRMATION MESSAGE
		embed.setTitle('**Set Pull Time (Updated)**')
		embed.setColor(colors.success)
		embed.addField('**Pull time**', dateFormat(time.value, "h:MM TT"))
		message.channel.send(embed)
		
		discord.embedRaid(raid, {message: message, update: true})

	}

}