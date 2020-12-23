const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:						'code',
	synopsis:					'View a trainer code',
	description:				'This command allows you to show your own code or view other player codes.',
	syntax:						`${p}code ${so[0]}@mention|code${so[1]}`,
	alias:						[],
	dm:							true,
	availability:				['PogoNWFortWorth', 'Pogo Barn'],
	revision:					'08-21-20',


	//DEFAULT ACTION
	default: {
		description_short:		'Returns trainer code with QRCode card',
		synopsis:				'Returns trainer code with QRCode card',
		description:			'This command will display your trainer code along with a QRCode for easy scanning.',
		examples:				[
									{code: `${p}code`}
								]
	},

	// ACTIONS
	actions: {

		// Mention
		mention: {
			name:				'@mention',
			synopsis:			'View a code card by mentioning a discord member.',
			syntax:				`${p}code ${sr[0]}@mention${sr[1]}`,
			description:		'This action allows you to look up a trainer code and qrcode by mentioning them.',
			examples:			[
									{code: `${p}code @heartyjessman`, description: "Show heartyjessman's code card."}
								]
		},

		// Code
		code: {
			synopsis:			'Display a code card by passing a trainer code.',
			description:		`This action allows you to display a code card for a trainer code, even if it is not in the system.`,
			examples: 			[
									{code: `${p}code 1234 5678 9012`, description: 'Show code card for "1234 5678 9012".'},
									{code: `${p}code 123456789012`, description: 'Show code card for "123456789012".'}
								],
			name:				'Code',
			required:			true,
			syntax:				`${p}code ${sr[0]}code${sr[1]}`
		}

	} // ACTIONS

}
