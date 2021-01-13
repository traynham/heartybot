const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'su',
	synopsis:					'Super User',
	description:				'Super functionality.',
	syntax:						`${p}su ${so[0]}action${so[1]}`,
	aliases:						[],
	roles:						['su'],
	dm:							true,
	revision:					'01-12-21',

	// ACTIONS
	actions: [
		
		// Pokedex Update
		{
			name:					'pokedex update',
			synopsis:			'Update Pokedex',
			description:		'Download and generate an udpated pokedex.',
			examples: 			[
										['Update.', `${p}su pokedex update`]
									],
			syntax:				`${p}su ${sr[0]}pokedex update${sr[1]}`
		},

	// Pokedex Update
	{
		name:					'boss update',
		synopsis:			'Update bosses',
		description:		'Update the bosses list.',
		examples: 			[
									['Update.', `${p}su boss update`]
								],
		syntax:				`${p}su ${sr[0]}boss update${sr[1]}`
	},

		// HELP
		{
			name:					'help',
			default:				true,
			synopsis:			'Get help',
			description:		'Show Help',
			examples:			[
										['Show help', '?me']
									]
		}

	] // ACTIONS

}
