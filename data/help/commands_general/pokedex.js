const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:						'pokedex',
	synopsis:					'View pokemon cards',
	description:				'View pokemon cards',
	syntax:						`${p}pokedex ${so[0]}pokemon${so[1]}`,
	alias:						[`${p}dex`],
	dm:							true,
	availability:				['PogoNWFortWorth', 'Pogo Barn'],
	revision:					'09-02-20',

	//DEFAULT ACTION
	default: {
		description_short:		'bogus string in pokedex.js help.',
		synopsis:				'Displays usage.',
		description:			'Displays usage.',
		examples:				[
									{code: `${p}pokedex`}
								]
	},

	// ACTIONS
	actions: {

		// HELP
		help: {
			name:				'help',
			synopsis:			'Show Help',
			description:		'Show Help',
			syntax:				`${p}pokedex ${sr[0]}help${sr[1]} ${so[0]}action${so[1]}`,
			examples:			[
									{code: `${p}pokedex help`, description: "Show pokedex help."},
									{code: `${p}pokedex help pokemon`, description: "Show pokemon action help."},
									{code: `${p}dex help`, description: "Show pokedex help."}
								]
		},

		// Pokemon
		pokemon: {
			name:				'Pokemon',
			synopsis:			'View pokemon card',
			syntax:				`${p}pokedex ${sr[0]}pokemon${sr[1]}`,
			description:		'This action will display a pokemon card with vital information.',
			examples:			[
									{code: `${p}pokedex pikachu`, description: "Show Pikachu card."},
									{code: `${p}dex aer`, description: "Show Aerodactyl card."}
								]
		}

	} // ACTIONS

}
