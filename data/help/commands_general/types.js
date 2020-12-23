const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:						'types',
	synopsis:					'View pokemon types',
	description:				'View pokemon types',
	syntax:						`${p}types ${so[0]}type${so[1]}`,
	alias:						[`${p}t`, `${p}type`],
	dm:							true,
	availability:				['PogoNWFortWorth', 'Pogo Barn'],
	revision:					'09-02-20',

	//DEFAULT ACTION
	default: {
		description_short:		'Pokemon types infographic.',
		synopsis:				'Pokemon types infographic.',
		description:			'Returns a pokemon type infographic.',
		examples:				[
									{code: `${p}types`}
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

		// List
		list: {
			name:				'List',
			synopsis:			'Lists pokemon types',
			syntax:				`${p}types ${sr[0]}list${sr[1]}`,
			description:		'This action will list pokemont types.',
			examples:			[
									{code: `${p}type list`, description: "Show types."},
									{code: `${p}t list`, description: "Show types."}
								]
		},

		// Type
		type: {
			name:				'Type',
			synopsis:			'View pokemon type card',
			syntax:				`${p}types ${sr[0]}type${sr[1]}`,
			description:		'This action will display a type card.',
			examples:			[
									{code: `${p}types electric`, description: "Show electric type card."},
									{code: `${p}t psy`, description: "Show psychic type card."}
								]
		}

	} // ACTIONS

}
