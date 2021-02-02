const {syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'team',
	synopsis:					'Show/set team.',
	description:				'Show/set your team for this raid.',
	syntax:						`team ${so[0]}instinct/mystic/valor${so[1]}`,
	aliases:						['tea'],
	dm:							false,
	usage:						[
										['To show your team:', 'team'],
										['To set team:', 'team valor']
									],
	revision:					'02-01-21',

	// ACTIONS
	actions: [
	
		// SET
		{
			name:					'set',
			synopsis:			'Set team.',
			description:		'Set your team for this raid.',
			syntax:				`team ${sr[0]}instinct/mystic/valor${sr[1]}`,
			examples:			[
										['To set team:', 'team instinct'],
										['To set team:', 'team mystic'],
										['To set team:', 'team valor']
									]
		},
		
		// SHOW
		{
			name:					'show',
			aliases:				['sh'],
			default:				true,
			synopsis:			'Show/set team.',
			description:		'Show/set your team for this raid.',
			syntax:				'team',
			examples:			[
										['Show team:', 'team']
									]
		}

	] // ACTIONS

}