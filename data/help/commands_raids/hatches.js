const {syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'hatches',
	synopsis:					'Show/Set hatch time.',
	description:				'Show or set the egg hatch time for this raid.',
	syntax:						`hatches ${so[0]}time/duration${so[1]}`,
	aliases:						['hat', 'hatch'],
	dm:							false,
	usage:						[
										['Show hatch time:', 'hatches'],
										['Set hatch time with duration:', 'hatches 32m'],
										['Set hatch time with time', 'hatches 6:42']
									],
	revision:					'01-28-21',

	// ACTIONS
	actions: [
	
		// SET
		{
			name:					'set',
			synopsis:			'Set hatch',
			description:		'Set hatch time',
			syntax:				`hatches ${sr[0]}time/duration${sr[1]}`,
			examples:			[
										['Set hatch with duration:', 'hatch 32m'],
										['Set hatch with time', 'hatch 6:42']
									]
		},
		
		// SHOW
		{
			name:					'show',
			default:				true,
			synopsis:			'Show hatch.',
			description:		'Show hatch time.',
			syntax:				'hatches',
			examples:			[
										['Show hatch:', 'hatch']
									]
		}

	] // ACTIONS

}