const dateFormat = require('dateformat')
const Discord = require('discord.js')
const {colors} = require('@config').discord
const {domain} = require(`@config`)
//const {detect} = require(`@core`)
const payload_obj = require('@core/util/payload')

/**

	* Check to see if this is an update somehow? Pass as option, then find all the snowflakes for the raid.
	* save message id in lowdb_raids record.
	* should message param be move over to options since it won't always be needed (for updates)?
**/

module.exports = async (message, raid, opt) => {

	let payload = payload_obj()
	
	const lowdb_raids = require('@models_lowdb/raids.js')

	console.log(raid)
	console.log(opt)
	
	console.log(typeof raid)
	
	if(typeof raid === 'string'){
		raid = lowdb_raids.raids_find(raid)
		console.log('NEW RAID::', raid)
	}
	
	
	//let isEgg = detect.isEgg(raid.boss).value
	let isEgg = false
	
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
	
	
	let result = await message.channel.send(embed)
	console.log('RESULT::', result)
	console.log('RESULT::', result.id)
	
	
	
	// SEND MESSAGE
	//message.channel.send(embed)
	
	return payload
	
	

}