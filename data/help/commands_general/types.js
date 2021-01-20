const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'types',
	synopsis:					'View pokemon types',
	description:				'View pokemon types',
	syntax:						`${p}types ${so[0]}type${so[1]}`,
	aliases:						['t', 'type'],
	dm:							true,
	revision:					'01-12-21',

	//DEFAULT ACTION
	default: {
		description_short:	'Pokemon types infographic.',
		synopsis:				'Pokemon types infographic.',
		description:			'Returns a pokemon type infographic.',
		examples:				[
										["Show types", `${p}types`]
									]
	},

	// ACTIONS
	actions: [

		// HELP
		{
			name:				'help',
			synopsis:		'Show Help',
			description:	'Show Help',
			syntax:			`${p}pokedex ${sr[0]}help${sr[1]} ${so[0]}action${so[1]}`,
			examples:		[
									["Show pokedex help.", `${p}pokedex help`],
									["Show pokemon action help.", `${p}pokedex help pokemon`],
									["Show pokedex help.", `${p}dex help`]
								]
		},

		// INFOGRAPHIC
		{
			name:				'infographic',
			aliases:			['info', 'ig', 'graphc'],
			default:			true,
			synopsis:		'Show pokemon types infographic',
			syntax:			`${p}types ${sr[0]}infographic${sr[1]}`,
			description:	'Show pokemon types infographic.',
			examples:		[
									["Show Infographic", `${p}type info`],
									["Show Infographic", `${p}type`],
								]
		},
		
		// LIST
		{
			name:				'list',
			aliases:			['ls'],
			synopsis:		'Lists pokemon types',
			syntax:			`${p}types ${sr[0]}list${sr[1]}`,
			description:	'This action will list pokemon types.',
			examples:		[
									["Show types.", `${p}type list`]
								]
		},

		// TYPE
		{
			name:				'[type]',
			synopsis:		'View pokemon type card',
			syntax:			`${p}types ${sr[0]}type${sr[1]}`,
			description:	'This action will display a type card.',
			examples:		[
									["Show electric type card.", `${p}types electric`],
									["Show psychic type card.", `${p}t psy`]
								]
		}

	] // ACTIONS

}
