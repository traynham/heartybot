module.exports = {

	// GENERAL
	token: process.env.discord_token,
	prefix: process.env.discord_prefix,
	prefix_help: process.env.discord_prefix_help,
	
	// SYNTAX TOKENS
	syntax_required: ['[', ']'],
	syntax_optional: ['{', '}'],
	
	// COLORS
	colors: {
	
		// General
		caution:	'#f0fc03',
		code:		'#ffc800',
		error:		'#ff0000',
		success:	'#4aff03',
		//primary:	'#0099ff',
		primary:	'#454d55',
		
		// Pogo Types
		bug:		'#a8b820',
		dark:		'#735a4a',
		dragon:		'#7038f8',
		electric:	'#f8d030',
		fairy:		'#ee99ac',
		fighting:	'#c03028',
		fire:		'#f08030',
		flying:		'#a890f0',
		ghost:		'#6363b5',
		grass:		'#78c850',
		ground:		'#e0c068',
		ice:		'#98d8d8',
		normal:		'#a8a878',
		poison:		'#b55aa5',
		psychic:	'#f85888',
		rock:		'#bda55a',
		steel:		'#b8b8d0',
		water:		'#6890f0'

	},
	
	emoji: {
	
		// TEAMS
		valor:			'<:valor:743601869036978326>',
		mystic:			'<:mystic:743602010569572484>',
		instinct:		'<:instinct:743602040009261136>',
		
		// GENERAL
		blank:			'<:blank:748979783953809529>',
		check:			':white_check_mark:',
		greater:		'<:greater:749065915785543770>',
		less:			'<:less:749065936711188490>',
		hearty:			'<:hearty:743602927457009675>',
		question:		':grey_question:',
		x:				':x:',
		
		// NUMBERS
		0:				':zero:',
		1:				':one:',
		2:				':two:',
		3:				':three:',
		4:				':four:',
		5:				':five:',
		6:				':six:',
		7:				':seven:',
		8:				':eight:',
		9:				':nine:',

		// TYPES
		'~':			'~',
		bug:			'<:type_bug:748260745791143956>',
		dark:			'<:type_dark:748261371401076866>',
		dragon:			'<:type_dragon:748262969195888780>',
		electric:		'<:type_electric:748263001156616304>',
		fairy:			'<:type_fairy:748263049462546703>',
		fighting:		'<:type_fighting:748263079032258692>',
		fire:			'<:type_fire:748263141800018151>',
		flying:			'<:type_flying:748263184242311188>',
		ghost:			'<:type_ghost:748263248125493370>',
		grass:			'<:type_grass:748263271655538698>',
		ground:			'<:type_ground:748263299203858583>',
		ice:			'<:type_ice:748263319059824720>',
		normal:			'<:type_normal:748263347052609736>',
		poison:			'<:type_poison:748263373908738220>',
		psychic:		'<:type_psychic:748263405684785253>',
		rock:			'<:type_rock:748263430569459843>',
		steel:			'<:type_steel:748263470536982699>',
		water:			'<:type_water:748263490502000782>',
		
		// UNICODE
		spacer:		'\u200B'
	},
	
	// PRIVACY
	privacy: [
		'team',
		'level',
		'started',
		'code',
		'cd'
	],
	
	// ME ACTIONS
	actions: ['code', 'hide', 'level', 'privacy', 'show', 'started', 'team'],
	
	// RAID DURATION
	raid_duration_boss: 45,
	raid_duration_egg: 60,
	
	// ME ACTIONS
	teams: ['red', 'valor', 'blue', 'mystic', 'yellow', 'instinct'],

	// TRAINER STATES
	trainer_states: [
		{
			state: 'interested',
			value: 'Interested',
			aliases: ['int', 'inter'],
			description: 'I am interested in going.',
			emoji: 'eyes'
		},
		{
			state: 'going',
			value: 'Going',
			aliases: ['go', 'goi'],
			description: 'I\'m going to the raid!',
			emoji: 'vertical_traffic_light'
		},
		{
			state: 'omw',
			value: 'On My Way',
			aliases: ['on my way', 'on my way!', 'omy'],
			description: 'I\'m on my way!',
			emoji: 'door'
		},
		{
			state: 'driving',
			value: 'Driving',
			aliases: ['d', 'dri', 'drive'],
			description: 'I am currently driving.',
			emoji: 'red_car'
		},
		{
			state: 'here',
			value: 'Here',
			aliases: ['her'],
			description: 'I am at the raid IRL.',
			emoji: 'world_map'
		},
		{
			state: 'invite',
			value: 'Invite',
			aliases: ['inv', 'invite me'],
			description: 'I need a remote raid invite',
			emoji: 'ticket'
		},
		{
			state: 'ready',
			value: 'Ready',
			aliases: ['rea'],
			description: 'I\'m ready to go in',
			emoji: 'ok'
		},
		{
			state: 'cancel',
			value: 'Cancel',
			aliases: ['can'],
			description: 'Sorry, I can\'t make it.',
			emoji: 'x'
		},
		{
			state: 'reporting',
			value: 'Reporting',
			aliases: ['rep', 'report'],
			description: 'I\'m just reporting the raid.',
			emoji: 'speaking_head_in_silhouette'
		},
		{
			state: 'done',
			value: 'Done',
			aliases: ['don', 'dn'],
			description: 'I completed the raid.',
			emoji: 'heavy_check_mark'
		},
	],
	
	// THESE ARE FULL CONTENT REPLACEMENTS FOR A RAID CHANNEL.
	// They are needed only when the command has spaces.
	trainer_states_replacements: [
		{
			command: 'on my way!',
			replace: 'omw'
		},
		{
			command: 'on my way',
			replace: 'omw'
		},
		{
			command: 'invite me',
			replace: 'invite'
		},
		{
			command: '100',
			replace: 'perfect'
		},
		{
			command: 'hundy',
			replace: 'perfect'
		}
	]
	
}