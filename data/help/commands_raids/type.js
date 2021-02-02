module.exports = {

	// GENERAL
	name:							'type',
	synopsis:					'Show boss type.',
	description:				'Show type or types for raid boss.',
	syntax: 						'type',
	aliases:						['tp', 'typ', 'types'],
	dm:							false,
	usage:						[
										['Show type:', 'type']
									],
	revision:					'02-02-21',

	// ACTIONS
	actions: [
	
		// SET
		{
			name:					'show',
			default:				true,
			synopsis:			'Show boss type.',
			description:		'Show type or types for raid boss.',
			syntax:				'type',
			aliases:				['tp', 'typ', 'types'],
			examples:			[
										['Show type:', 'type']
									]
		}

	] // ACTIONS

}