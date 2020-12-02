



module.exports = (q, payload, message) => {

	const Discord = require('discord.js')
	const {colors, emoji} = require(`@config`).discord
	
	console.log('THIS IS A DEBUG REQUEST')
	
	const debug = new Discord.MessageEmbed()
	debug.setColor(colors.error)
	
	debug.setTitle('Raid Debug Report')
	debug.setDescription(q.debug)
	debug.addField(
		'**Boss**', 
		payload.pokemon ? `${emoji.blank}${emoji.check} ${payload.pokemon.value}` : `${emoji.blank}${emoji.x} NOT FOUND`
	)
	debug.addField(
		'**Time**', 
		payload.time ? `${emoji.blank}${emoji.check} ${payload.time.value}` : `${emoji.blank}${emoji.x} NOT FOUND`
	)
	debug.addField(
		'**Gym**', payload.gym ? `${emoji.blank}${emoji.check} ` + payload.gym.gym.name : `${emoji.blank}${emoji.x} NOT FOUND`
	)
	
	// ADD A PROBLEMS FIELD AND REPORT PROBLMES SUCH AS NO BOSS, TO MANY AND TIME HAS ALREADY PASSED
	
	
	message.channel.send(debug)


} // EXPORTS