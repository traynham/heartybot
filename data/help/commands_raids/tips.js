module.exports = {

	// GENERAL
	name:							'tip',
	synopsis:					'Show raid status.',
	description:				'Show the status card for the raid.',
	syntax:						'status',
	aliases:						[],
	dm:							false,
	enabled:						false,
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