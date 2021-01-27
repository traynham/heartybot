module.exports = {
	
	commands_general: {
		boss: require('./commands_general/boss'),
		code: require('./commands_general/code'),
		gyms: require('./commands_general/gyms'),
		help: require('./commands_general/help'),
		me: require('./commands_general/me'),
		pokedex: require('./commands_general/pokedex'),
		raid: require('./commands_general/raid'),
		su: require('./commands_general/su'),
		types: require('./commands_general/types')
	},
	
	commands_raids: {
		address: require('./commands_raids/address'),
		boss: require('./commands_raids/boss'),
		coordinates: require('./commands_raids/coordinates'),
		charge: require('./commands_raids/charge'),
		code: require('./commands_raids/code'),
		codes: require('./commands_raids/codes'),
	}

}