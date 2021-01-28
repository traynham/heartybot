const { add, isAfter, isBefore, sub } = require('date-fns')
const dateFormat = require('dateformat')
const Discord = require('discord.js')

const lowdb_raids = require('@models_lowdb/raids.js')
const {colors, raid_duration_egg, raid_duration_boss} = require(`@config`).discord
const {detect, discord, help, util} = require(`@core`)

module.exports = {
	name: 'ends',
	meta: help.get('commands_raids', 'ends').value,
	execute(message, argv) {

		let args = argv._
		let author = message.author

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		embed.setTitle('**Raid End Time**')
		embed.setThumbnail(util.emoji_img('alarm_clock', {h: 25}).value)
		embed.setFooter(`${author.username}`, `${author.displayAvatarURL()}`)

		let raid = lowdb_raids.raids_find(message.channel.id)
		let isEgg = detect.isEgg(raid.boss).value
		let errorMsg = null

		// SHOW END TIME (IF NO ARGS)
		if(args.length === 0){
			embed.addField('**Ends**', dateFormat(raid.time, "h:MM TT"))
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

		// IS LONGER THAN RAID_DURATION_EGG
		if(isEgg && isAfter(time.value, add(new Date(), {minutes: raid_duration_egg + raid_duration_boss})) ){
			errorMsg = `Sorry, the time or duration you entered is to far in the future.`
		}

		// TO FAR IN FUTURE.
		if(!isEgg && isAfter(time.value, add(new Date(), {minutes: raid_duration_boss})) ){
			errorMsg = `Sorry, the time or duration you entered is to far in the future.`
		}

		// RETURN ERROR CARD.
		if(errorMsg){
			embed.setTitle('**Set End Time (Error)**')
			embed.setColor(colors.error)
			embed.setDescription(errorMsg)
			message.channel.send(embed)
			return
		}

		let raid_time = time.value
		let raid_hatch = sub(time.value, {minutes: raid_duration_boss})

		// UPDATE RAID
		lowdb_raids.raids_update(message.channel.id, 'time', raid_time)
		lowdb_raids.raids_update(message.channel.id, 'hatches', raid_hatch)

		// SHOW CONFIRMATION MESSAGE
		embed.setTitle('**Raid End Time (Updated)**')
		embed.setColor(colors.success)
		embed.addField('**Ends**', dateFormat(raid_time, "h:MM TT"))
		message.channel.send(embed)

		discord.embedRaid(raid, {message: message, update: true})

	}

}