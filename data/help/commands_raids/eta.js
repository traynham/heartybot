const {syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'eta',
	synopsis:					'Show/Set eta.',
	description:				'Show or set when you can arrive at the raid, IRL.',
	syntax:						`eta ${so[0]}time/duration${so[1]}`,
	aliases:						[],
	dm:							false,
	usage:						[
										['Show eta:', 'eta'],
										['Set eta with duration:', 'eta 5m'],
										['Set eta with time', 'ends 5:05']
									],
	revision:					'01-28-21',

	// ACTIONS
	actions: [
	
		// SET
		{
			name:					'set',
			synopsis:			'Set eta',
			description:		'Set eta',
			syntax:				`eta ${sr[0]}time/duration${sr[1]}`,
			examples:			[
										['Set eta with duration:', 'eta 5m'],
										['Set eta with time', 'ends 5:05']
									]
		},
		
		// SHOW
		{
			name:					'show',
			default:				true,
			synopsis:			'Show eta.',
			description:		'Show eta.',
			syntax:				'eta',
			examples:			[
										['Show eta:', 'eta']
									]
		}

	] // ACTIONS

}