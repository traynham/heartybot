module.exports = {
	
	detect: {
		action: require('./detect/action'),
		boss: require('./detect/boss'),
		boss_tier: require('./detect/boss_tier'),
		code: require('./detect/code'),
		duration: require('./detect/duration'),
		isEgg: require('./detect/isEgg'),
		level: require('./detect/level'),
		team: require('./detect/team'),
		time: require('./detect/time')
	},
	
	discord: {
		embedPokemon: require('./discord/embedPokemon'),
		hasRole: require('./discord/hasRole'),
		isAdmin: require('./discord/isAdmin'),
		parseRaid: require('./discord/parseRaid'),
		setImage: require('./discord/setImage'),
		setRole: require('./discord/setRole'),
		setThumbnail: require('./discord/setThumbnail')
	},

	gyms: {
		find: require('./gyms/find'),
		areas: require('./gyms/areas')
	},
	
	help: {
		command: require('./help/command'),
		command_action: require('./help/command_action'),
		commands: require('./help/commands')
	},
	
	me: {
		find: require('./me/find'),
		findOrCreate: require('./me/findOrCreate'),
		set: require('./me/set')
	},
	
	pokedex: {
		find: require('./pokedex/find'),
		get: require('./pokedex/get'),
		perfect: require('./pokedex/perfect'),
		type: require('./pokedex/type'),
		update: require('./pokedex/update')
	},
	
	qr: {
		create: require('./qrcodes/create')
	},
	
	util: {
		date: require('./util/date'),
		emoji_img: require('./util/emoji_img'),
		file: require('./util/file'),
		obj2QueryString: require('./util/obj2QueryString'),
		payload_obj: require('./util/payload'),
		titleCase: require('./util/titlecase'),
		trainerCodeFormat: require('./util/trainerCodeFormat'),
		update_bosses: require('./util/update_bosses')
	}
	
}