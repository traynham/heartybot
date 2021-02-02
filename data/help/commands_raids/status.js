module.exports = {

	// GENERAL
	name:							'status',
	synopsis:					'Show raid status.',
	description:				'Show the status card for the raid.',
	syntax:						'status',
	aliases:						['s', 'stat', 'stats'],
	dm:							false,
	revision:					'02-01-21',

	// ACTIONS
	actions: [
	
		// SHOW
		{
			name:					'show',
			aliases:				['sh'],
			default:				true,
			synopsis:			'Show raid status.',
			description:		'Show the status card for the raid.',
			syntax:				'status',
			examples:			[
										['Show raid status', 'status'],
										['Show raid status, alternate', 's']
									]
		}

	] // ACTIONS

}