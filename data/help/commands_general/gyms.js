const {prefix: p, syntax_required: sr} = require('@config').discord


module.exports = {

	// GENERAL
	name:						'gyms',
	aliases:					['g', 'gym'],
	synopsis:				'Search gyms',
	description:			'Search and display gym information.',
	syntax:					`${p}gyms ${sr[0]}search${sr[1]}`,
	dm:						true,
	revision:				'01-12-21',

	// ACTIONS
	actions: [

		// HELP
		{
			name:				'help',
			default:			true,
			synopsis:		'Show Help',
			description:	'Show Help',
			examples:		[
									['Show gym help', `${p}gyms help`]
								]
		},

		// SEARCH
		{
			name:				'search',
			synopsis:		'Gym search term',
			description:	'Search criteria to find gym.',
			syntax:			`${p}gyms ${sr[0]}search${sr[1]}`,
			tip:				'For most gyms you can also use an acronym.',
			examples: 		[
									['Brian Schwengler Memorial Park', `${p}gyms brian`],
									['Pioneer Country Water Tower', `${p}gyms pcwt`]
								]
		},
		
		// By
		{
			name:				'by',
			aliases:			['near'],
			synopsis:		'List gyms by a gym.',
			description:	'List gyms close to a gym or coordinates.',
			syntax:			`${p}gyms ${sr[0]}by${sr[1]} ${sr[0]}search${sr[1]}`,
			tip:				'For most gyms you can also use an acronym.',
			examples: 		[
									['Show gyms near the "Frog" gym.', `${p}gyms by frog`],
									['Show gyms near "33.05442455967762, -97.46975223981603".', `${p}gyms by 33.05442455967762, -97.46975223981603`]
								]
		},
		
		// In
		{
			name:				'in',
			aliases:			['for'],
			synopsis:		'List gyms in area.',
			description:	'List gyms in an area.',
			syntax:			`${p}gyms ${sr[0]}in${sr[1]} ${sr[0]}search${sr[1]}`,
			tip:				'For most gyms you can also use an acronym.',
			examples: 		[
									['Show gyms in "Hastlet" gym.', `${p}gyms in Haslet`],
									['Show gyms in "32.829658908183106, -97.39242177812784".', `${p}gyms in 32.829658908183106, -97.39242177812784`]
								]
		}

	]

}
