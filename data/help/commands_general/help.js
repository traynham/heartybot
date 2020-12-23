const {prefix: p, syntax_optional: so} = require('@config').discord

module.exports = {

	// GENERAL
	name:						'help',
	synopsis:					'Show help',
	description:				'View inline help for commands and actions.',
	new:						false,
	syntax:						`${p}help ${so[0]}command${so[1]} ${so[0]}action${so[1]}`,
	alias:						[`${p}h`],
	dm:							true,
	availability:				['PogoNWFortWorth', 'Pogo Barn'],
	revision:					'08-11-20',

	//DEFAULT ACTION
	default: {
		synopsis:				'List available commands',
		description_short:		'List available commands',
		description:			'This will show all available commands in which you can view help.',
		examples:				[
									{code: `${p}help`},
									{code: `${p}h`}
								]
	},

	// ACTIONS
	actions: {

		// COMMAND
		command: {
			name:				'Command',
			description_short:	'Search for commands',
			synopsis:			'Search for commands',
			description:		'Use this action to get information about a command. You can also get help for command actions.',
			tip:				'For most gyms you can also use an acronym.',
			required:			true,
			examples: 			[
									{code: `${p}help raid`, description: 'Get help for "${p}raid" command'},
									{code: `${p}help raid boss`, description: 'Get help for "boss" action for the "${p}raid" command'}
								]
		}

	}

}
