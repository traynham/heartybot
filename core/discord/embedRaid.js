const dateFormat = require('dateformat')
const Discord = require('discord.js')
const {colors} = require('@config').discord
const {domain} = require(`@config`)
const payload_obj = require('@core/util/payload')

module.exports = async (raid, opt) => {
	
	/*
		
		opt.message	Working message instance
		opt.new		For new Channel message
		opt.update	Update all messages for a raid.
	
	*/

	let payload = payload_obj()
	
	const lowdb_raids = require('@models_lowdb/raids.js')
	const {detect} = require(`@core`)

	// FIND RAID OBJECT IF STRING
	if(typeof raid === 'string'){
		raid = lowdb_raids.raids_find(raid)
	}
	
	let isEgg = detect.isEgg(raid.boss).value
	
	const embed = new Discord.MessageEmbed()
	payload.value = embed
	embed.setColor(colors.primary)
	
	
	// GET POKEMON EMBED
	embed.setTitle(`**${raid.boss} Raid**`)
	embed.setURL(`${domain}/gyms/${raid.gym.gymid}`)
	embed.setThumbnail(`https://${raid.asset}`)
	if(isEgg) embed.addField('**Hatches**', dateFormat(raid.hatches, "h:MM TT"))
	embed.addField('**Ends**', dateFormat(raid.time, "h:MM TT"))

	embed.addField(
		`**${raid.name}**`,
		`[${raid.gym.address}](https://www.google.com/maps/search/${encodeURIComponent(raid.gym.coordinates)} 'Get Directions')`
	)
	
	if(opt.new){
		console.log('this is the "New"')
		let chan = await opt.message.client.channels.fetch(raid.channel)		
		let result = await chan.send(embed)
		lowdb_raids.raids_update(raid.channel, 'messages', [...raid.messages, [raid.channel, result.id]])
		return payload
	}


	
	if(opt.raid_channel){
		console.log('It this triggered??? - raid_channel')
		console.log(opt)
		let chan = await opt.message.client.channels.fetch(opt.raid_channel)		
		let result = await chan.send(embed)
		lowdb_raids.raids_update(raid.channel, 'messages', [...raid.messages, [opt.raid_channel, result.id]])
		return payload
	}


	
	if(opt.message && opt.update != true){
		let result = await opt.message.channel.send(embed)
		lowdb_raids.raids_update(raid.channel, 'messages', [...raid.messages, [opt.message.channel.id, result.id]])
		return payload
	}
	
	if(opt.update){

		raid.messages.reverse().forEach(async ([channelID, messageID]) => {

			let chan = await opt.message.client.channels.fetch(channelID)

			chan.messages.fetch(messageID).then(message => {
				message.edit(embed)
			})

		})

		return payload

	}
	
	return payload
	
}