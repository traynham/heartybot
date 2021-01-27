module.exports = {

	// GENERAL
	name:							'address',
	synopsis:					'Show gym address.',
	description:				'Show the address for this raid gym.',
	syntax:						'address',
	aliases:						['add', 'addr', 'location'],
	dm:							false,
	revision:					'01-25-21',

	// ACTIONS
	actions: [
	
		// SHOW
		{
			name:					'show',
			aliases:				['sh'],
			default:				true,
			synopsis:			'Show gym location.',
			description:		'Show the address for this raid gym.',
			syntax:				'address',
			examples:			[
										['Show address', 'address'],
										['Show address', 'addr']
									]
		}

	] // ACTIONS

}