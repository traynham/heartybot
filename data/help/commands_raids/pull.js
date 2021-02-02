const {syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'pull',
	synopsis:					'Show/Set start time.',
	description:				'Show or set when to start the raid.',
	syntax:						`pull ${so[0]}time/duration${so[1]}`,
	aliases:						['pul', 'pull', 'star', 'starting'],
	dm:							false,
	usage:						[
										['Show pull:', 'pull'],
										['Set pull with duration:', 'pull 5m'],
										['Set pull with time', 'pull 5:05']
									],
	revision:					'02-01-21',

	// ACTIONS
	actions: [
	
		// SET
		{
			name:					'set',
			synopsis:			'Set start time.',
			description:		'Set when to start the raid.',
			syntax:				`pull ${sr[0]}time/duration${sr[1]}`,
			examples:			[
										['Set pull with duration:', 'pull 5m'],
										['Set pull with time', 'pull 5:05']
									]
		},
		
		// SHOW
		{
			name:					'show',
			default:				true,
			synopsis:			'Show pull.',
			description:		'Show pull.',
			syntax:				'pull',
			examples:			[
										['Show pull:', 'pull'],
										['Show pull:', 'start']
									]
		}

	] // ACTIONS

}