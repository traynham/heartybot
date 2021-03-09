const {syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'pull',
	synopsis:					'Show/Set pull time.',
	description:				'Show or set when to go into the raid lobby.',
	syntax:						`pull ${so[0]}time/duration${so[1]}`,
	aliases:						['pul', 'pull'],
	dm:							false,
	usage:						[
										['Show pull:', 'pull'],
										['Set pull with duration:', 'pull 5m'],
										['Set pull with time', 'pull 5:05']
									],
	revision:					'03-08-21',

	// ACTIONS
	actions: [
	
		// SET
		{
			name:					'set',
			synopsis:			'Set pull time.',
			description:		'Show or set when to go into the raid lobby.',
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
										['Show pull:', 'pull']
									]
		}

	] // ACTIONS

}