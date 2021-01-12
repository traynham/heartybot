const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord
const {privacy, teams} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'me',
	synopsis:					'Me card',
	description:				'Displays information about you.',
	syntax:						`${p}me ${so[0]}action${so[1]} ${so[0]}value${so[1]}`,
	aliases:						['m', 'my'],
	dm:							true,
	revision:					'01-12-21',

	// ACTIONS
	actions: [

		// Card
		{
			name:					'card',
			synopsis:			'View your me card',
			description:		'Use this action to view your me card. ',
			examples: 			[
										['Show your Me card.', `${p}me`]
									],
			default:				true,
			syntax:				`${p}me`
		},
		
		// Code
		{
			name:					'code',
			synopsis:			'View or set your trainer code',
			description:		'Use this action to view your trainer code card. ' +
									`You can also set your code by passing your code to the \`${p}me\` command.`,
			examples: 			[
										['Show your Me Code card.', `${p}me code`],
										['Set your code.', `${p}me code ############`],
										['Set your code variant.', `${p}m ############`]
									],
			tip:					`To set your code, simply use \`${p}m ############\`. The bot will detect your code and update your card.`,
			syntax:				`${p}me ${sr[0]}code${sr[1]} ${so[0]}value${so[1]}`
		},

		// HELP
		{
			name:					'help',
			synopsis:			'Get help',
			description:		'Show Help',
			examples:			[
										['Show help', '?me']
									]
		},

		// HIDE
		{
			name:					'hide',
			synopsis:			'Hide items on your me card.',
			description:		`This action allows you to hide sections of your me card. For example, if you are maxed out on friends, you can hide your friend code.\n\n**NOTE:** Your code will be shown if you use ${p}me code or ${p}code, but will be hidden in all other situations.`,
			examples: 			[
										['Hide your trainer code.', `${p}me hide code`],
										['Hide your team when showing your card.', `${p}me hide team`]
									],
			syntax:				`${p}me ${sr[0]}hide${sr[1]} ${so[0]}value${so[1]}`,
			values:				privacy.join(', ')
		},

		// LEVEL
		{
			name:					'level',
			aliases:				['lvl'],
			synopsis:			'View or set your level',
			description:		`This action will allow you to view or set your level. To set your level, simply pass a valid level number to ${p}me`,
			examples: 			[
										['Show your level.', `${p}me level`],
										['Set your level.', `${p}me level 40`],
										['Set your level alternate.', `${p}me 40`]
									],
			syntax:				`${p}me ${sr[0]}level${sr[1]} ${so[0]}value${so[1]}`
		},

		// PRIVACY
		{
			name:					'privacy',
			aliases:				['pri', 'priv', 'private', 'pvt'],
			synopsis:			'View your privacy settings',
			description:		'This action will show you what items are hidden and shown on your Me card.',
			examples: 			[
										['View privacy settings.', `${p}me privacy`]
									],
			syntax:				`${p}me ${sr[0]}privacy${sr[1]}`
		},

		// SHOW
		{
			name:					'show',
			synopsis:			'Show items on your me card.',
			description:		'This action allows you to show sections of your me card.',
			examples: 			[
										['Show your trainer code when displaying your card.', `${p}me show code`],
										['Show your level when displaying your card.', `${p}me show level`]
									],
			syntax:				`${p}me ${sr[0]}code${sr[1]} ${so[0]}value${so[1]}`,
			values:				privacy.join(', ')
		},

		// STARTED
		{
			name:					'started',
			aliases:				['start'],
			synopsis:			'View or set your started date',
			description:		'Show off how long you have been playing by setting your Pokémon Go started date.',
			examples: 			[
										['Show your started date.', `${p}me started`],
										['Set your started date.', `${p}me started 07/12/2016`]
									],
			syntax:				`${p}me ${sr[0]}started${sr[1]} ${so[0]}value${so[1]}`
		},

		// TEAM
		{
			name:					'team',
			aliases:				['tea', 'tm'],
			synopsis:			'View or set your team',
			description:		'This action allows you to view or set your team.',
			tip:				`To set your team, simply use \`${p}m val\`, \`${p}m mys\` or \`${p}m ins\`. The bot will detect your team and update your card.`,
			examples: 			[
										['Display your team.', `${p}me team`],
										['Set your team.', `${p}me team valor`]
									],
			syntax:				`${p}me ${sr[0]}team${sr[1]} ${so[0]}value${so[1]}`,
			values:				teams.join(', ')
		}

	] // ACTIONS

}
