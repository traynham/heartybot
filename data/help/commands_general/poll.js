const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:						'poll',
	synopsis:				'Create a simple poll',
	description:			'Create a simple poll.',
	syntax:					`${p}poll ${so[0]}title:${so[1]}${so[0]}description:${so[1]} ${sr[0]}comma delimited choices${sr[1]}`,
	roles:					['admin'],
	dm:						false,
	revision:				'03-12-21',

	// ACTIONS
	actions: [
		
		// HELP
		{
			name:					'help',
			roles:				['admin'],
			default:				true,
			synopsis:			'Get help',
			description:		'Show Help',
			examples:			[
										['Show help', '?poll']
									]
		},

		// CREATE
		{
			name:					'create',
			aliases: 			[],
			roles:				['admins'],
			synopsis:			'Create a simple poll',
			description:		'Create a simple poll',
			examples:			[
										[
											'Create a poll with all options', 
											`${p}poll Title:Description:One, Two, Three`
										],
										[
											'Create a poll with title and choices', 
											`${p}poll My Great Title:Four, Five, Six`
										],
										[
											'Create a poll with only choices', 
											`${p}poll Seven, Eigth, Nine`
										],
										[
											'Create a poll with only choices using custom reactions', 
											`${p}poll 💜 ten, 🤣 eleven, 🤷‍♂️ twelve`
										]
									]
		}

	] // ACTIONS

}
