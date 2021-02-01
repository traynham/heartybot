const {syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'people',
	synopsis:					'Show/set people/accounts count.',
	description:				'Show or set how many people or accounts are raiding.',
	syntax:						`people ${so[0]}count${so[1]}`,
	aliases:						['acc', 'account', 'accounts', 'p', 'ppl', 'peo', 'tra', 'trainer', 'trainers'],
	dm:							false,
	usage:						[
										['Show people:', 'people'],
										['Set people:', 'people 3']
									],
	revision:					'02-01-21',

	// ACTIONS
	actions: [
	
		// SET
		{
			name:					'set',
			synopsis:			'Set people/accounts count.',
			description:		'Set how many people or accounts are raiding.',
			syntax:				`people ${sr[0]}count${sr[1]}`,
			examples:			[
										['Set people:', 'people 3'],
										['Set people alternate:', 'p 3']
									]
		},
		
		// SHOW
		{
			name:					'show',
			aliases:				['sh', 'sho'],
			default:				true,
			synopsis:			'Show people/accounts count.',
			description:		'Show how many people or accounts are raiding.',
			syntax:				'people',
			examples:			[
										['Show people:', 'people'],
										['Show people alternate:', 'p']
									]
		}

	] // ACTIONS

}