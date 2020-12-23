const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'boss',
	synopsis:					'Display bosses',
	description:				'Display current Raid Bosses.',
	syntax:						'boss {boss/level/action}',
	aliases:						[`${p}b`, `${p}bos`],
	usage: 						{
										'To show bosses:': 'boss',
										'To show specific boss:': 'boss darkari',
										'To show a tier': 'boss l5'
									},
	dm:							true,
	availability:				['PogoNWFortWorth', 'Pogo Barn'],
	show_help_footer:			true,
	revision:					'12-18-20',


	//DEFAULT ACTION
	default: {
		synopsis:				'Returns current raid boss list',
		description:			'Display a list of current raid bosses.',
		examples:				[
										{code: `${p}boss`}
									]
	},

	// ACTIONS
	actions: [
/*
		// HELP
		{
			name:					'help',
			synopsis:			'Show Help',
			description:		'Show Help',
			syntax:				`${p}boss ${sr[0]}help${sr[1]} ${so[0]}action${so[1]}`,
			examples:			{
										'Show boss help using "?" prefix.': `?boss`,
										'Show boss help.': `${p}boss help`,
										'Show pokemon action help.': `${p}boss help pokemon`,
										'Show boss help alias.': `${p}b help`
									}
		},
*/
		// Boss
		{
			name:					'boss',
			aliases:				['mon', 'pokemon'],
			synopsis:			'View boss card',
			syntax:				`${p}boss ${sr[0]}boss name${sr[1]}`,
			description:		'This action will display a boss card with vital information.',
			examples:			{
										"Show Heatran boss card.": `${p}boss heatran`
									}
		},
		
		// ADD (ADMIN)
		{
			name:					'add',
			aliases:				[],
			roles:				['admin'],
			syntax:				`${p}boss ${sr[0]}boss tier${sr[1]} ${sr[0]}boss name${sr[1]}`,
			synopsis:			'Add a boss to the bosses list.',
			description:		'Add a boss to the bosses list.',
			examples:			{
										'Add darkari to bosses:': `${p}boss add l5 darkari`
									}
		},
		
		// LIST (ADMIN)
/*
		{
			name: 'list',
			aliases: ['ls'],
			synopsis: 'List current bosses.'
		},
*/	
		// REMOVE (ADMIN)
		{
			name:					'remove',
			aliases:				['rem', 'rm'],
			roles:				['admin'],
			synopsis:			'Remove boss from list.',
			description:		'Remove a boss from the bosses list.',
			examples:			{
										'Remove darkari from bosses:': `${p}boss remove darkari`
									}
		},
		
		// UPDATE (SU)
			{
			name:					'update',
			aliases:				[],
			roles:				['su'],
			synopsis:			'Update bosses.',
			description:		'Update the bosses list.',
			examples:			{
										'Update boss list:': `${p}boss update`
									}
		}

	] // ACTIONS

}