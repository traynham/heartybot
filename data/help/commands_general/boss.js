const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'boss',
	synopsis:					'Display bosses',
	description:				'Display current Raid Bosses.',
	syntax:						'boss {boss/level/action}',
	aliases:						['b', 'bos'], // no prefix!
	usage: 						[
										['To show bosses:', `${p}boss`],
										['To show specific boss:', `${p}boss darkari\n${p}boss kyurem perfect`],
										['To show a tier', `${p}boss l5`]
									],
	dm:							true,
	show_help_footer:			true,
	revision:					'01-12-21',

	// ACTIONS
	actions: [

		// ADD (ADMIN)
		{
			name:					'add',
			aliases:				[],
			roles:				['admin'],
			syntax:				`${p}boss ${sr[0]}boss tier${sr[1]} ${sr[0]}boss name${sr[1]}`,
			synopsis:			'Add a boss to the bosses list.',
			description:		'Add a boss to the bosses list.',
			examples:			[
										['Add darkari to bosses:', `${p}boss add l5 darkari`]
									]
		},

		// Boss
		{
			name:					'boss',
			aliases:				['mon', 'pokemon'],
			synopsis:			'View boss card',
			syntax:				`${p}boss ${sr[0]}boss name${sr[1]} ${so[0]}filter${so[1]}`,
			description:		'This action will display a boss card with vital information. You can also use an optional filter to only show charge, fast, perfect, and type.',
			examples:			[
										["Show Heatran boss card.", `${p}boss heatran`],
										["Show Kyurem's perfect CPs.", `${p}boss kyurem perfect`]
									]
		},

		// HELP
		{
			name:					'help',
			aliases:				['-h'],
			synopsis:			'Show Help',
			description:		'Show Help',
			syntax:				`${p}boss ${sr[0]}help${sr[1]} ${so[0]}action${so[1]}`,
			examples:			[
										['Show boss help using "?" prefix.', `?boss`],
										['Show boss help.', `${p}boss help`],
										['Show pokemon action help.', `${p}boss help boss`],
										['Show boss help alias.', `${p}b help`],
										['Show boss help with extra nerd points.', `${p}b -h`]
									]
		},

		// LIST (DEFAULT)
		{
			name:					'list',
			aliases:				['ls'],
			default:				true,
			synopsis:			'Returns current raid boss list',
			description:		'Display a list of current raid bosses.',
		},

		// REMOVE (ADMIN)
		{
			name:					'remove',
			aliases:				['rem', 'rm'],
			roles:				['admin'],
			synopsis:			'Remove boss from list.',
			description:		'Remove a boss from the bosses list.',
			examples:			[
										['Remove darkari from bosses:', `${p}boss remove darkari`]
									]
		},
		
		// UPDATE (SU)
		{
			name:					'update',
			aliases:				[],
			roles:				['su'],
			synopsis:			'Update bosses.',
			description:		'Update the bosses list.',
			examples:			[
										['Update boss list:', `${p}boss update`]
									]
		}

	] // ACTIONS

}