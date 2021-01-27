module.exports = {

	// GENERAL
	name:							'codes',
	synopsis:					'List codes for raid.',
	description:				'List codes for people at this raid.',
	syntax:						'codes',
	aliases:						['cds'],
	dm:							false,
	usage:						[
										['To show codes', 'codes']
									],
	revision:					'01-27-21',

	// ACTIONS
	actions: [

		{
			name:					'show',
			default:				true,
			synopsis:			'List codes for raid.',
			description:		'List codes for people at this raid.',
			syntax:				`codes`,
			examples:			[
										['List codes for raid', 'codes'],
										['List codes for raid alternate', 'cds']
									]
		}

	] // ACTIONS

}