const dateFormat = require('dateformat')
const {add, isAfter, isBefore } = require('date-fns')
const Discord = require('discord.js');
const lowdb_raids = require('@models_lowdb/raids.js')

const {colors, raid_duration_egg, raid_duration_boss} = require(`@config`).discord
const {detect, util} = require(`@core`)

module.exports = {
	name: 'hatches',
	aliases: ['hat', 'hatch'],
	synopsis: 'Show/Set hatch time.',
	description: 'Show or set the egg hatch time for this raid.',
	syntax: ['hatches {time/duration}'],
	usage: {'Show hatch time:': 'hatches', 'Set hatch time with duration:': 'hatches 32m', 'Set hatch time with time': 'ends 6:42'},
	cooldown: 5,
	execute(message, argv) {
		
		let args = argv._
		let author = message.author
		//let raid = lowdb_raids.findRaid(message.channel.id)
		let raid = lowdb_raids.raids_find(message.channel.id)
		let isEgg = detect.isEgg(raid.boss).value
		let errorMsg = null

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		embed.setTitle('**Hatch Time**')
		embed.setThumbnail(util.emoji_img('alarm_clock', {h: 25}).value)
		embed.setFooter(`${author.username}`, `${author.displayAvatarURL()}`)

		// ALREADY HATCHED
		if(!isEgg){
			embed.setDescription('The egg has already hatched.')
			message.channel.send(embed)
			return
		}
		
		// SHOW HATCHES
		if(isEgg && args.length === 0){
			embed.addField('Hatches', dateFormat(raid.hatches, "h:MM TT"))
			message.channel.send(embed)
			return
		}

		let time = detect.time(args)
		if(time.error) time = detect.duration(args)

		// TIME NOT FOUND.
		if(time.error){
			errorMsg = 'Sorry, I could not find a time or duration.'
		}

		// SHOW ERROR IF TIME IS IN PAST.
		if(isBefore(time.value, new Date()) ){
			errorMsg = 'Sorry, the time you entered has already happened.'
		}

		// LONGER THAN RAID_DURATION_EGG
		if(isAfter(time.value, add(new Date(), {minutes: raid_duration_egg})) ){
			errorMsg = `Sorry, egg duration cannot be longer than ${raid_duration_egg} minutes.`
		}

		// RETURN ERROR CARD.
		if(errorMsg){
			embed.setTitle('**Set Hatch Time (Error)**')
			embed.setColor(colors.error)
			embed.setDescription(errorMsg)
			message.channel.send(embed)
			return
		}

		let raid_time = add(time.value, {minutes: raid_duration_boss})
		let raid_hatch = time.value

		// UPDATE RAID
		//let setTime = lowdb_raids.updateRaid(message.channel.id, 'time', raid_time)
		//let setHatch = lowdb_raids.updateRaid(message.channel.id, 'hatches', raid_hatch)
		let setTime = lowdb_raids.raids_update(message.channel.id, 'time', raid_time)
		let setHatch = lowdb_raids.raids_update(message.channel.id, 'hatches', raid_hatch)

		// SHOW CONFIRMATION MESSAGE
		embed.setTitle('**Hatch Time (Updated)**')
		embed.setColor(colors.success)
		embed.addField('**Hatches**', dateFormat(raid_hatch, "h:MM TT"))
		embed.addField('**Ends**', dateFormat(raid_time, "h:MM TT"))

		message.channel.send(embed)

	}

}