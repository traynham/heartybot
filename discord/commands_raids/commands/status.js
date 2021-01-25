const lowdb_raids = require('@models_lowdb/raids.js')
const {discord} = require(`@core`)

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

		console.log(argv)

		let raid = lowdb_raids.raids_find(message.channel.id)

		// EXIT EARLY IF RAID NOT FOUND.
		if(!raid){
			// I'm not sure how this would trigger.
			console.log('Raid not found')
			return true
		}

		// SHOW STATUS		
		discord.embedRaid(raid, {message: message})

	}
}