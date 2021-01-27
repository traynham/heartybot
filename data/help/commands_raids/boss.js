const {syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'boss',
	command_set:				'raids',
	synopsis:					'View/Set raid boss',
	description:				'View or set the current raid boss.',
	syntax:						`boss ${so[0]}action/pokemon${so[1]}`,
	aliases:						['b'],
	roles:						[],
	dm:							false,
	revision:					'01-26-21',

	// ACTIONS
	actions: [

		// ADD
		{
			name:					'add',
			aliases:				[],
			roles:				['admin'],
			syntax:				`boss ${sr[0]}boss tier${sr[1]} ${sr[0]}boss name${sr[1]}`,
			synopsis:			'Add a boss to the bosses list.',
			description:		'Add a boss to the bosses list.',
			examples:			[
										['Add darkari to bosses:', 'boss add l5 darkari']
									]
		},
		
		// HELP
		{
			name:					'help',
			synopsis:			'Show Help',
			description:		'Show Help',
			syntax:				`boss ${sr[0]}help${sr[1]} ${so[0]}action${so[1]}`,
			examples:			[
										['Show boss help', '?boss']
									]
		},
		
		// LIST
		{
			name:					'list',
			aliases:				['ls'],
			synopsis:			'Show raid boss list',
			description:		'Display a list of current raid bosses.',
			examples:			[
										['Show boss list', 'boss list'],
										['Show boss list, alternate', 'boss ls']
									]
		},
		
		// REMOVE (ADMIN)
		{
			name:					'remove',
			aliases:				['rem', 'rm'],
			roles:				['admin'],
			synopsis:			'Remove boss from list.',
			description:		'Remove a boss from the bosses list.',
			examples:			[
										['Remove darkari from bosses:', `boss remove darkari`]
									]
		},
		
		// Set
		{
			name:					'set',
			synopsis:			'Set raid boss',
			syntax:				`boss ${sr[0]}boss name${sr[1]}`,
			description:		'This action will display a boss card with vital information.',
			examples:			[
										['Set raid boss to Heatran', 'boss heatran']
									]
		},

		// Show
		{
			name:					'show',
			default:				true,
			synopsis:			'View raid boss',
			syntax:				'boss',
			description:		'This action will display a boss card with vital information.',
			examples:			[
										['Show boss', 'boss']
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
										['Update boss list:', 'boss update']
									]
		}

	] // ACTIONS

}
