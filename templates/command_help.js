const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'command', // Name in Lower Case.
	synopsis:					'synopsis', // One or two word description.
	description:				'description', // Long description.
	syntax:						`${p}command ${sr[0]}action${sr[1]}`, // Basic syntax example.
	aliases:						['pokemon', 'mon', 'dex'], // Array of aliases.
	dm:							true, // Command can be used in a DM with bot.
	revision:					'01-11-21', // Updated date.

	// ACTIONS
	actions: [ // An array of actions.

		// HELP
		{
			name:					'help',
			synopsis:			'Show Help',
			description:		'Show Help',
			default:				true,
			syntax:				`${p}command ${sr[0]}help${sr[1]} ${so[0]}action${so[1]}`,
			examples:			[ // Array of arrays. Inner arrays are [description, code]
										["Show command help.", `?command`],
										["Show command help.", `${p}command help`],
										["Show command action help.", `${p}command help pokemon`]
									]
		},

		// Action1
		{
			name:					'action1', // Action name
			aliases:				['act', 'act1'], // Array of action aliases.
			synopsis:			'take action', // One or two word description.
			syntax:				`${p}comand ${sr[0]}action1${sr[1]}`, // Basic syntax example.
			description:		'This action does something cool.', // Long description.
			examples:			[ // Array of arrays. Inner arrays are [description, code]
										["Show Pikachu card.", `${p}pokedex pikachu`],
										["Show Aerodactyl card.", `${p}dex aer`]
									]
		}

	] // ACTIONS

}