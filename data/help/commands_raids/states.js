module.exports = {

	// GENERAL
	name:							'states',
	synopsis:					'List possible states.',
	description:				'Returns a list of possible trainer states for a raid.',
	syntax:						'states',
	aliases:						['state'],
	dm:							false,
	revision:					'02-01-21',

	// ACTIONS
	actions: [
	
		// SHOW
		{
			name:					'show',
			aliases:				['sh'],
			default:				true,
			synopsis:			'List possible states.',
			description:		'Returns a list of possible trainer states for a raid.',
			syntax:				'states',
			examples:			[
										['List states', 'states']
									]
		}

	] // ACTIONS

}
