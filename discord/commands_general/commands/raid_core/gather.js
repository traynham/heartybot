const Discord = require('discord.js')
const {colors} = require(`@config`).discord

/*
	# Gather
	Gathers more info from user using a collector.
	
	options: title, description, payload
	function: Used to set payload value

*/

module.exports = ({title, description, payload}, updater) => {
	
	const dispatcher = require('./dispatcher')
	
	const message = payload.message
	
	// CREATE EMBED
	let embed = new Discord.MessageEmbed()
	embed.setColor(colors.error)	
	embed.setTitle(title)
	embed.setDescription(description)
	embed.setFooter('Enter "cancel" to end this process.')	
	message.channel.send(embed)
	
	// COLLECTOR
	const filter = m => m.author.id === message.author.id
	const collector = message.channel.createMessageCollector(filter, { max: 1, time: 60000 });
	
	
	collector.on('collect', async m => {
	
		console.log('COLLECTED: ', m.content)
		
		if(m.content == 'cancel') {
			//console.log('Cancel requested.')
			
			// CREATE CANCEL EMBED
			let embed = new Discord.MessageEmbed()
			embed.setColor(colors.error)	
			embed.setTitle(`${title} (CANCELLED)`)
			embed.setDescription('You cancelled this request.')	
			message.channel.send(embed)
			
			// NEED TO RUN CLEANUP FUNCTION HERE TO DELETE MESSAGES AND SUCH
			
			return true
		}
		
		await updater(m.content)

		//console.log('DISPATCH PAYLOAD: ', payload)
		
		// NEXT, DISPATCH AGAIN
		
		dispatcher(payload)

	});
	
	collector.on('end', collected => {
		console.log(`Collected ${collected.size} items for "${title}"`)
	})
	
}