const {prefix_help: p, syntax_optional: so} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'commands',
	synopsis:					'Show help',
	description:				'View inline help for raid commands and actions.',
	syntax:						`${p}${so[0]}command${so[1]} ${so[0]}action${so[1]}`,
	aliases:						['?', 'com', 'comm', 'command', 'commands', 'h', 'help', 'man', 'opt', 'options'],
	dm:							true,
	revision:					'01-27-21',

	// ACTIONS
	actions: [

		// COMMAND
		{
			name:					'command',
			synopsis:			'Search for commands',
			description:		'Use this action to get information about a command. You can also get help for command actions.',
			examples: 			[
										['Get help for "raid" command', `${p}help raid`],
										['Get help for "boss" action for the "raid" command', `${p}help raid boss`]
									]
		},
		
		// LIST (DEFAULT)
		{
			name:					'show',
			aliases:				['sh'],
			default:				true,
			synopsis:			'List available commands',
			description:		'This will show all available commands in which you can view help.',
			examples: 			[
										['List commands', `${p}`]
									]
		},

	]

}
