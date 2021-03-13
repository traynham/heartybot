const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:						'su',
	synopsis:				'Super User',
	description:			'Super functionality.',
	syntax:					`${p}su ${so[0]}action${so[1]}`,
	roles:					['su'],
	dm:						true,
	revision:				'01-13-21',

	// ACTIONS
	actions: [
		
		// HELP
		{
			name:					'help',
			roles:				['su'],
			default:				true,
			synopsis:			'Get help',
			description:		'Show Help',
			examples:			[
										['Show help', '?me']
									]
		},

		// JEEVES
		{
			name:					'jeeves',
			aliases: 			['j', 'jv'],
			roles:				['su'],
			synopsis:			'Run Jeeves',
			description:		'Run Jeeves',
			examples:			[
										['Run Jeeves', `${p}su jeeves`]
									]
		},

		// Update
		{
			name:				'update',
			roles:			['su'],
			aliases:			['u', 'up', 'ud', 'refresh', 'fresh'],
			synopsis:		'Update things',
			description:	'Update the Pokedes or Bosses list.',
			examples: 		[
									['Update pokedex.', `${p}su update pokedex`],
									['Update bosses.', `${p}su update bosses`]
								],
			syntax:			`${p}su ${sr[0]}update${sr[1]} ${sr[0]}bosses|pokedex${sr[1]}`,
			valuess:			['bosses', 'pokedex']
		}

	] // ACTIONS

}