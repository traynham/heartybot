const {syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'code',
	synopsis:					'Show a trainer code.',
	description:				'Display a Pokémon Go friend code.',
	syntax:						`code ${so[0]}@mention/code${so[1]}`,
	aliases:						['cd'],
	dm:							false,
	usage:						[
										['To show your code:', 'code'],
										['To show a code by mention', 'code @discord_nick'],
										['Display code card for a code', 'code 123456789012']
									],
	revision:					'01-27-21',

	// ACTIONS
	actions: [

		// Code
		{
			name:					'code',
			synopsis:			'Display a trainer code.',
			description:		`This action allows you to display a code card for a trainer code, even if it is not in the system.`,
			examples: 			[
										['Show code card for "1234 5678 9012".', `code 1234 5678 9012`],
										['Show code card for "123456789012".', `code 123456789012`]
									],
			required:			true,
			syntax:				`code ${sr[0]}code${sr[1]}`
		},

		// Mention
		{
			name:					'@mention',
			synopsis:			'View a code by mention.',
			syntax:				`code ${sr[0]}@mention${sr[1]}`,
			description:		'This action allows you to look up a trainer code and qrcode by mentioning them.',
			examples:			[
										["Show heartyjessman's code card.", `code @heartyjessman`]
									]
		},

		// SHOW (CURRENTLY A BOGUS COMMAND THAT WORKS BY DEFAULT)
		{
			name:					'show',
			default:				true,
			synopsis:			'View your code.',
			description:		'This action allows you to show your trainer code card.',
			syntax:				`code ${sr[0]}show${sr[1]}`,
			examples:			[
										['Show your card', `code`],
										['Show your card', `code show`]
									]
		}

	] // ACTIONS

}