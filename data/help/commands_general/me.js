const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord
const {privacy, teams} = require('@config').discord

module.exports = {

	// GENERAL
	name:						'me',
	synopsis:					'Me card',
	description:				'Displays information about you.',
	syntax:						`${p}me ${so[0]}action${so[1]} ${so[0]}value${so[1]}`,
	alias:						[`${p}m`],
	dm:							true,
	availability:				['PogoNWFortWorth', 'Pogo Barn'],
	revision:					'08-21-20',

	//DEFAULT ACTION
	default: {
		description_short:		'Returns Me card',
		synopsis:				'Returns Me card',
		description:			'This command will return an error when no action is specified because a search term is required.',
		examples:				[
									{code: `${p}me`},
									{code: `${p}m`}
								]
	},

	// ACTIONS
	actions: {

		// HELP
		help: {
			name:				'Help',
			synopsis:			'Get help',
			description:		'Show Help',
			examples:			[
									{code: `${p}me help`},
									{code: `${p}m help`}
								]
		},

		// Code
		code: {
			synopsis:			'View or set your trainer code',
			description:		`Use this action to view your trainer code card. You can also set your code by passing your code to the ${p}me command.`,
			examples: 			[
									{code: `${p}me code`, description: 'Show your Me Code card.'},
									{code: `${p}me code ############`, description: 'Set your code.'},
									{code: `${p}m ############`, description: 'Set your code.'}
								],
			tip:				`To set your code, simply use \`${p}m ############\`. The bot will detect your code and update your card.`,
			name:				'Code',
			required:			true,
			syntax:				`${p}me ${sr[0]}code${sr[1]} ${so[0]}value${so[1]}`
		},

		// HIDE
		hide: {
			synopsis:			'Hide items on your me card.',
			description:		`This action allows you to hide sections of your me card. For example, if you are maxed out on friends, you can hide your friend code. Your code will be shown if you use ${p}me code or ${p}code, but will be hidden in all other situations.`,
			examples: 			[
									{code: `${p}me hide code`, description: 'Hide your trainer code when displaying your card.'},
									{code: `${p}me hide team`, description: 'Hide your team when showing your card.'}
								],
			name:				'Hide',
			required:			true,
			syntax:				`${p}me ${sr[0]}hide${sr[1]} ${so[0]}value${so[1]}`,
			values:				privacy.join(', ')
		},

		// LEVEL
		level: {
			synopsis:			'View or set your level',
			description:		`This action will allow you to view or set your level. To set your level, simply pass a valid level number to ${p}me`,
			examples: 			[
									{code: `${p}me level`, description: 'Show your level.'},
									{code: `${p}me level 40`, description: 'Set your level.'},
									{code: `${p}me 40`, description: 'Set your level.', default: true}
								],
			name:				'Level',
			required:			true,
			syntax:				`${p}me ${sr[0]}level${sr[1]} ${so[0]}value${so[1]}`
		},

		// PRIVACY
		privacy: {
			synopsis:			'View your privacy settings',
			description:		'This action will show you what items are hidden and shown on your Me card.',
			examples: 			[
									{code: `${p}me privacy`, description: 'View privacy settings.', default: true},
								],
			name:				'Privacy',
			required:			true,
			syntax:				`${p}me ${sr[0]}privacy${sr[1]}`
		},

		// SHOW
		show: {
			synopsis:			'Show items on your me card.',
			description:		'This action allows you to show sections of your me card.',
			examples: 			[
									{code: `${p}me show code`, description: 'Show your trainer code when displaying your card.'},
									{code: `${p}me show level`, description: 'Show your level when displaying your card.'}
								],
			name:				'Show',
			required:			true,
			syntax:				`${p}me ${sr[0]}code${sr[1]} ${so[0]}value${so[1]}`,
			values:				privacy.join(', ')
		},

		// STARTED
		started: {
			synopsis:			'View or set your started date',
			description:		'Show off how long you have been playing by setting your Pokémon Go started date.',
			examples: 			[
									{code: `${p}me started`, description: 'Show your started date.'},
									{code: `${p}me started 07/12/2016`, description: 'Set your started date.'}
								],
			name:				'Started',
			required:			true,
			syntax:				`${p}me ${sr[0]}code${sr[1]} ${so[0]}value${so[1]}`
		},

		// TEAM
		team: {
			synopsis:			'View or set your team',
			description:		'This action allows you to view or set your team.',
			tip:				`To set your team, simply use \`${p}m val\`, \`${p}m mys\` or \`${p}m ins\`. The bot will detect your team and update your card.`,
			examples: 			[
									{code: `${p}me team`, description: 'Display your team.'},
									{code: `${p}me team valor`, description: 'Set your team.'}
								],
			name:				'Team',
			required:			true,
			syntax:				`${p}me ${sr[0]}code${sr[1]} ${so[0]}value${so[1]}`,
			values:				teams.join(', ')
		}

	} // ACTIONS

}
