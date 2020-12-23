module.exports = {
	
	commands_general: {
		boss: require('./commands_general/boss'),
		code: require('./commands_general/code'),
		gyms: require('./commands_general/gyms'),
		help: require('./commands_general/help'),
		me: require('./commands_general/me'),
		pokedex: require('./commands_general/pokedex'),
		types: require('./commands_general/types')
	},
	
	commands_raids: {
		boss: require('./commands_raids/boss'),
	}

}