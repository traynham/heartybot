const dateFormat = require('dateformat')
const Discord = require('discord.js')

const lowdb_raids = require('@models_lowdb/raids.js')
const {detect, discord} = require(`@core`)
const {colors} = require(`@config`).discord
const {domain} = require(`@config`)

module.exports = {
	name: 'status',
	aliases: ['s', 'stat', 'stats'],
	actions_admin: ['add', 'remove', 'update'],
	synopsis: 'Show raid status.',
	description: 'Show the status card for the raid.',
	syntax: ['status'],
	usage: {'To show status:': 'status'},
	show_help_footer: false,
	cooldown: 5,
	execute(message, argv) {

		let args = argv._

		//let raid = lowdb_raids.findRaid(message.channel.id)
		let raid = lowdb_raids.raids_find(message.channel.id)
		let isEgg = detect.isEgg(raid.boss).value

		// EXIT EARLY IF RAID NOT FOUND.
		if(!raid){
			// I'm not sure how this would trigger.
			console.log('Raid not found')
			return true
		}

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		
		// EXIT EARLY IF ADMIN ACTION ATTEMPT BY NON-ADMIN.
		if(this.actions_admin.includes(args[0]) && !discord.isAdmin(message)){			
			embed.setColor(colors.error)
			embed.setDescription('Sorry, this action requires an admin account.')
			message.channel.send(embed)
			return
		}

		// SHOW STATUS
			
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
		
		// SEND MESSAGE
		message.channel.send(embed)

	}
}