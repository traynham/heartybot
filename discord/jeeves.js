const Discord = require('discord.js');
const { differenceInMinutes } = require('date-fns')
const {detect} = require(`@core`)
const lowdb_raids = require('@models_lowdb/raids.js')
const guilds = require('@data/private/guilds.json')
const {emoji, raid_duration_boss} = require(`@config`).discord
const bosses = require('@models_lowdb/bosses.js').bosses() // Raw BOSSESS JSON.

module.exports = async (client) => {
	
	console.log(`Jeeves ${new Date()}`)
	
	// ==================================================
	// MANAGE RAID CHANNEL MESSAGES
	// ==================================================
	
	let raid_channels = []
	
	// GATHER RAID CHANNEL IDS FROM GUILDS.JSON
	guilds.forEach( guild => {
		guild.channels.forEach(channel => {
			if(channel.type == 'raid') { raid_channels.push(channel.id)}
		})
	})
	
	// PROCESS RAID CHANNELS.
	raid_channels.forEach( async raid_channel => {
	
		let raid_messages = []

		lowdb_raids.raids_list().forEach(raid => {
			raid.messages.forEach(message => { raid_messages.push(message[1]) })
		})

		// PULL SNOWFLAKE FROM GUILDS.JSON
		let channel = await client.channels.fetch(raid_channel)
		let messages = await channel.messages.fetch()

		// FILTER OUT MESSAGES THAT SHOULD NOT BE DELETED.
		let messages_filtered = messages.filter(message => {
			if(
				!raid_messages.includes(message.id) && 
				differenceInMinutes(new Date(), new Date(message.createdTimestamp)) > 3
			){
				return true
			}
		})
	
		// DELETE REMAINING MESSAGES
		// TODO: BUILD IN A BETTER THROTTLE
		messages_filtered.array().forEach( (message, index) => {
			message.delete({ timeout: 1000 * index, reason: 'Stale Raid Message' })
			.then(msg => console.log(`Deleted message from ${msg.author.username} after ${1000 * index} milliseconds`))
			.catch(console.error);
		})

	})

	
	// ==================================================
	// MANAGE RAID UPDATE MESSAGES
	// ==================================================
	
	let raids = lowdb_raids.raids_list()

	// CHECK RAIDS...
	raids.forEach(raid => {
	
		const channel = client.channels.cache.find(channel => channel.id === raid.channel)
		const embed = new Discord.MessageEmbed()

		let left = differenceInMinutes(new Date(raid.time), new Date())
		let isEgg = detect.isEgg(raid.boss).value
		let status = lowdb_raids.raids_status(raid.channel).value

		status.left = left
	

//		console.log('\n==================================================')
//		console.log('STATUS', status)
		
		// TODO: Hatch stuff
		
		// STATUS OBJECT:
		//	{
		//		isEgg: false,
		//		isHatched: false,
		//		left: #,
		//		event_hatched: false,
		//		event_5m: false,
		//		event_10m: false,
		//		event_ended: false
		//	}
		
		// ON EGG HATCH (BY TIME)
		if(isEgg && !status.event_hatched && left <= raid_duration_boss){
			
			let boss_count = (bosses.tiers_obj[raid.boss] ? bosses.tiers_obj[raid.boss].length : 0)
			
			lowdb_raids.raids_status(raid.channel, 'event_hatched', true)
			
			if(boss_count == 1){
				console.log('Only one boss, set raid boss and post updated boss embed.')
			}

			if(bosses.tiers_obj[raid.boss]){
				embed.setDescription('The egg has hatched. Use `boss [boss name]` to set.')
				embed.addField('**Possible Bosses**', bosses.tiers_obj[raid.boss])
				channel.send(embed)
				return
			}
			
		}
		
		// ON DELETE CHANNEL
		if(left <= -3){
			embed.setDescription(`${emoji.clock} DELETE CHANNEL.`)
			let archive = lowdb_raids.raids_archive(raid.channel)
			if(!archive.error) channel.delete()
			return
		
		// ON RAID ENDED
		} else if(left <= 0 && !status.event_ended){
			embed.setDescription(`${emoji.clock} This raid has ended and this channel will be removed.`)
			lowdb_raids.raids_status(raid.channel, 'event_ended', true)

		// ON 5 MIN LEFT
		} else if(left <= 5 && !status.event_5m){
			embed.setDescription(`${emoji.clock} This raid will end in 5 minutes`)
			lowdb_raids.raids_status(raid.channel, 'event_5m', true)

		// ON 10 MIN LEFT
		} else if(left <= 10  && !status.event_10m){
			embed.setDescription(`${emoji.clock} This raid will end in 10 minutes`)
			lowdb_raids.raids_status(raid.channel, 'event_10m', true)

		}

		// SEND IF HAS DESCRIPTION
		if(embed.description) channel.send(embed)
	
	}) //raids.forEach
	
}
