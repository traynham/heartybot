module.exports = {

	// GENERAL
	name:							'coordinates',
	synopsis:					'Show gym coordinates.',
	description:				'Show the coordinates for this raid gym.',
	syntax:						'coordinates',
	aliases:						['coo', 'coord', 'coords', 'coordinates'],
	dm:							false,
	revision:					'01-25-21',

	// ACTIONS
	actions: [
	
		// SHOW
		{
			name:					'show',
			aliases:				['sh'],
			default:				true,
			synopsis:			'Show gym coordinates.',
			description:		'Show the coordinates for this raid gym.',
			syntax:				'address',
			examples:			[
										['Show coordinates', 'coordinates'],
										['Show coordinates', 'coo']
									]
		}

	] // ACTIONS

}