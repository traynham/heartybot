const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'code',
	synopsis:					'View a trainer code',
	description:				`This command allows you to show your own code or view other player codes.\n\n To set your code, see the ${p}me command`,
	syntax:						`${p}code ${so[0]}@mention|code${so[1]}`,
	aliases:						['cd'],
	dm:							true,
	revision:					'01-12-21',

	// ACTIONS
	actions: [

		// Code
		{
			name:					'code',
			synopsis:			'Display a code card by passing a trainer code.',
			description:		`This action allows you to display a code card for a trainer code, even if it is not in the system.`,
			examples: 			[
										['Show code card for "1234 5678 9012".', `${p}code 1234 5678 9012`],
										['Show code card for "123456789012".', `${p}code 123456789012`]
									],
			required:			true,
			syntax:				`${p}code ${sr[0]}code${sr[1]}`
		},

		// Mention
		{
			name:					'@mention',
			synopsis:			'View a code card by mentioning a discord member.',
			syntax:				`${p}code ${sr[0]}@mention${sr[1]}`,
			description:		'This action allows you to look up a trainer code and qrcode by mentioning them.',
			examples:			[
										["Show heartyjessman's code card.", `${p}code @heartyjessman`]
									]

		},
		
		// SHOW (CURRENTLY A BOGUS COMMAND THAT WORKS BY DEFAULT)
		{
			name:					'show',
			default:				true,
			synopsis:			'View your trainer code card.',
			description:		'This action allows you to show your trainer code card.',
			syntax:				`${p}code ${sr[0]}show${sr[1]}`,
			examples:			[
										['Show your card', `${p}code`],
										['Show your card', `${p}code show`]
									]
		}

	] // ACTIONS

}
