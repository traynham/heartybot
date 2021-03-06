module.exports = {
	
	commands_general: {
		boss:					require('./commands_general/boss'),
		code:					require('./commands_general/code'),
		gyms:					require('./commands_general/gyms'),
		help:					require('./commands_general/help'),
		me:					require('./commands_general/me'),
		pokedex:				require('./commands_general/pokedex'),
		poll:					require('./commands_general/poll'),
		raid:					require('./commands_general/raid'),
		su:					require('./commands_general/su'),
		types:				require('./commands_general/types')
	},
	
	commands_raids: {
		address:				require('./commands_raids/address'),
		boss:					require('./commands_raids/boss'),
		coordinates:	 	require('./commands_raids/coordinates'),
		charge:				require('./commands_raids/charge'),
		code:					require('./commands_raids/code'),
		codes:				require('./commands_raids/codes'),
		commands:			require('./commands_raids/commands'),
		ends:					require('./commands_raids/ends'),
		eta:					require('./commands_raids/eta'),
		fast:					require('./commands_raids/fast'),
		hatches:				require('./commands_raids/hatches'),
		list:					require('./commands_raids/list'),
		people:				require('./commands_raids/people'),
		perfect:				require('./commands_raids/perfect'),
		pull:					require('./commands_raids/pull'),
		states:				require('./commands_raids/states'),
		status:				require('./commands_raids/status'),
		team:					require('./commands_raids/team'),
		tips:					require('./commands_raids/tips'),
		trainer_status:	require('./commands_raids/trainer_status'),
		type:					require('./commands_raids/type'),
	}

}