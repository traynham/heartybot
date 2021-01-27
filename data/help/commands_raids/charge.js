module.exports = {

	// GENERAL
	name:							'charge',
	synopsis:					'Show charge moves.',
	description:				'Show boss charge moves.',
	syntax:						'charge',
	aliases:						['cha', 'char'],
	dm:							false,
	revision:					'01-27-21',

	// ACTIONS
	actions: [
	
		// SHOW
		{
			name:					'show',
			aliases:				['sh'],
			default:				true,
			synopsis:			'Show charge moves.',
			description:		'Show boss charge moves.',
			syntax:				'charge',
			examples:			[
										['Show charge moves', 'charge'],
										['Show charge moves alternate', 'cha']
									]
		}

	] // ACTIONS

}