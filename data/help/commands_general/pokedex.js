const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'pokedex',
	synopsis:					'View pokemon card',
	description:				'View pokemon card',
	syntax:						`${p}pokedex ${sr[0]}pokemon${sr[1]}`,
	aliases:						['pokemon', 'mon', 'dex'],
	dm:							true,
	revision:					'01-11-21',

	// ACTIONS
	actions: [

		// HELP
		{
			name:					'help',
			synopsis:			'Show Help',
			description:		'Show Help',
			default:				true,
			syntax:				`${p}pokedex ${sr[0]}help${sr[1]} ${so[0]}action${so[1]}`,
			examples:			{
										"Show pokedex help.": `${p}pokedex help`,
										"Show pokemon action help.": `${p}pokedex help pokemon`,
										"Show dex help.": `?dex`
									}
		},

		// Pokemon
		{
			name:					'pokemon',
			aliases:				['poke', 'mon'],
			synopsis:			'View pokemon card',
			syntax:				`${p}pokedex ${sr[0]}pokemon${sr[1]}`,
			description:		'This action will display a pokemon card with vital information.',
			examples:			{
										"Show Pikachu card.": `${p}pokedex pikachu`,
										"Show Aerodactyl card.": `${p}dex aer`
									}
		}

	] // ACTIONS

}