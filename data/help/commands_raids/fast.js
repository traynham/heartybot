module.exports = {

	// GENERAL
	name:							'fast',
	synopsis:					'Show fast moves.',
	description:				'Show fast moves for raid boss.',
	syntax:						'fast',
	aliases:						['fas'],
	dm:							false,
	revision:					'01-28-21',

	// ACTIONS
	actions: [
	
		// SHOW
		{
			name:					'show',
			aliases:				['sh'],
			default:				true,
			synopsis:			'Show fast moves.',
			description:		'Show fast moves for raid boss.',
			syntax:				'fast',
			examples:			[
										['Show fast moves', 'fast'],
										['Show fast moves alternate', 'fas']
									]
		}

	] // ACTIONS

}