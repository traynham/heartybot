const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'pokedex',
	synopsis:					'View pokemon card',
	description:				'View pokemon card',
	syntax:						`${p}pokedex ${so[0]}action${so[1]} ${sr[0]}pokemon${sr[1]}`,
	aliases:						['pokemon', 'mon', 'dex'],
	dm:							true,
	revision:					'03-12-21',

	// ACTIONS
	actions: [

		// HELP
		{
			name:					'help',
			synopsis:			'Show Help',
			description:		'Show Help',
			default:				true,
			syntax:				`${p}pokedex ${sr[0]}help${sr[1]} ${so[0]}action${so[1]}`,
			examples:			[
										["Show pokedex help.", `${p}pokedex help`],
										["Show pokemon action help.", `${p}pokedex help pokemon`],
										["Show dex help.", `?dex`]
									]
		},

		// POKEMON
		{
			name:					'pokemon',
			aliases:				['poke', 'mon'],
			synopsis:			'View pokemon card',
			syntax:				`${p}pokedex ${sr[0]}pokemon${sr[1]}`,
			description:		'This action will display a pokemon card with vital information.',
			examples:			[
										["Show Pikachu card.", `${p}pokedex pikachu`],
										["Show Aerodactyl card.", `${p}dex aer`]
									]
		},
		
		// CHARGE
		{
			name:					'charge',
			aliases:				[],
			synopsis:			"View a Pokémon's charge moves",
			syntax:				`${p}pokedex charge ${sr[0]}pokemon${sr[1]}`,
			description:		"This action will display a Pokémon's charge moves.",
			examples:			[
										["Show Pikachu charge moves.", `${p}pokedex charge pikachu`]
									]
		},
		
		// FAST
		{
			name:					'fast',
			aliases:				['fas'],
			synopsis:			"View a Pokémon's fast moves",
			syntax:				`${p}pokedex fast ${sr[0]}pokemon${sr[1]}`,
			description:		"This action will display a Pokémon's fast moves.",
			examples:			[
										["Show Pikachu fast moves.", `${p}pokedex fast pikachu`]
									]
		},
		
		// PERFECT
		{
			name:					'perfect',
			aliases:				['100', '100%', 'hun', 'hundy', 'per', 'perf', 'perfects'],
			synopsis:			"View a Pokémon's perfect CPs",
			syntax:				`${p}pokedex fast ${sr[0]}pokemon${sr[1]}`,
			description:		"This action will display a Pokémon's perfect CPs.",
			examples:			[
										["Show Pikachu perfect CPs.", `${p}pokedex perfect pikachu`]
									]
		},
		
		// PERFECT
		{
			name:					'type',
			aliases:				['tp', 'typ', 'types'],
			synopsis:			'Show Pokémon type.',
			syntax:				`${p}pokedex type ${sr[0]}pokemon${sr[1]}`,
			description:		'Show type or types for a Pokémon.',
			examples:			[
										["Show Eevee types", `${p}pokedex type eevee`]
									]
		}

	] // ACTIONS

}