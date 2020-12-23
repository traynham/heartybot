const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:						'boss',
	command_set:			'raids',
	synopsis:					'View raid bosses',
	description:				'View current raid boss information.',
	syntax:						`${p}boss ${so[0]}pokemon${so[1]}`,
	alias:						[`${p}b`],
	dm:							true,
	availability:				['PogoNWFortWorth', 'Pogo Barn'],
	revision:					'09-02-20',


	//DEFAULT ACTION
	default: {
		description_short:		'Returns current raid boss list',
		synopsis:			'Returns current raid boss list',
		description:			'This command will display a list of current raid bosses.',
		examples:				[
									{code: `${p}boss`}
								]
	},

	// ACTIONS
	actions: {

		// HELP
		help: {
			name:				'help',
			synopsis:			'Show Help',
			description:		'Show Help',
			syntax:				`${p}boss ${sr[0]}help${sr[1]} ${so[0]}action${so[1]}`,
			examples:			[
									{code: `${p}boss help`, description: "Show boss help."},
									{code: `${p}boss help pokemon`, description: "Show pokemon action help."},
									{code: `${p}b help`, description: "Show boss help."}
								]
		},

		// Pokemon
		pokemon: {
			name:				'Pokemon',
			synopsis:			'View boss card',
			syntax:				`${p}boss ${sr[0]}pokemon${sr[1]}`,
			description:		'This action will display a boss card with vital information.',
			examples:			[
									{code: `${p}boss heatran`, description: "Show Heatran boss card."}
								]
		}

	} // ACTIONS

}
