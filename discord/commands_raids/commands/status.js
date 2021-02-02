const lowdb_raids = require('@models_lowdb/raids.js')
const {discord} = require(`@core`)
const {help} = require(`@core`)

module.exports = {
	name: 'status',
	meta: help.get('commands_raids', 'status').value,
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