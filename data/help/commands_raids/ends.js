const {syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'ends',
	synopsis:					'Show/Set end time.',
	description:				'Show or set the end time for this raid.',
	syntax:						`ends ${so[0]}time/duration${so[1]}`,
	aliases:						['end', 'ending', 'ended'],
	dm:							false,
	usage:						[
										['Show end time:', 'ends'],
										['Set end time with duration:', 'ends 10m'],
										['Set end time with time', 'ends 12:45']
									],
	revision:					'01-27-21',

	// ACTIONS
	actions: [
	
		// SET
		{
			name:					'set',
			synopsis:			'Set end time',
			description:		'Set end time',
			syntax:				`ends ${sr[0]}time/duration${sr[1]}`,
			examples:			[
										['Set end time to 30 minuts from now', 'ends 30m'],
										['Set end time to 4:30', 'ends 430']
									]
		},
		
		// SHOW
		{
			name:					'show',
			default:				true,
			synopsis:			'Show end time.',
			description:		'Show end time.',
			syntax:				'ends',
			examples:			[
										['Show time', 'ends']
									]
		}

	] // ACTIONS

}