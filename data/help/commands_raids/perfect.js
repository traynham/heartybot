module.exports = {

	// GENERAL
	name:							'perfect',
	synopsis:					'Show perfects.',
	description:				'Show perfect cp values for raid boss.',
	syntax:						'perfect',
	aliases:						['100', '100%', 'hun', 'hundy', 'hundy p', 'per', 'perf', 'perfects'],
	dm:							false,
	revision:					'02-01-21',

	// ACTIONS
	actions: [
	
		// SHOW
		{
			name:					'show',
			aliases:				['sh'],
			default:				true,
			synopsis:			'Show perfects.',
			description:		'Show perfect cp values for raid boss.',
			syntax:				'perfect',
			examples:			[
										['Show perfect values', 'perfect'],
										['Show perfect values alternate', '100'],
										['Show perfect values alternate', 'hundy']
									]
		}

	] // ACTIONS

}