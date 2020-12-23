const {prefix: p, syntax_required: sr} = require('@config').discord


module.exports = {

	// GENERAL
	name:						'gyms',
	synopsis:					'Search gyms',
	description:				'Search and display gym information.',
	syntax:						`${p}gyms ${sr[0]}search${sr[1]}`,
	alias:						[`${p}g`, `${p}gym`],
	dm:							true,
	availability:				['PogoNWFortWorth', 'Pogo Barn'],
	revision:					'08-11-20',


	//DEFAULT ACTION
	default: {
		description_short:		'Returns error',
		synopsis:				'Returns error',
		description:			'This command will return an error when no action is specified because a search term is required.',
		examples:				[
									{code: `${p}gyms`},
									{code: `${p}g`}
								]
	},

	// ACTIONS
	actions: {

		// HELP
		help: {
			name:				'help',
			synopsis:			'Show Help',
			description:		'Show Help',
			examples:			[
									{code: `${p}gyms help`},
									{code: `${p}gym help`}
								]
		},

		// SEARCH
		search: {
			name:				'Search',
			synopsis:			'Gym search term',
			description:		'Search criteria to find gym.',
			syntax:				`${p}gyms ${sr[0]}search${sr[1]}`,
			tip:				'For most gyms you can also use an acronym.',
			required:			true,
			examples: 			[
									{code: `${p}gyms brian`, description: 'Brian Schwengler Memorial Park'},
									{code: `${p}gyms pcwt`, description: 'Pioneer Country Water Tower'}
								]
		}

	}

}
