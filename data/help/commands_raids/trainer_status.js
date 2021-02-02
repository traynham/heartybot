const {trainer_states} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'trainer_status',
	synopsis:					'Set your status',
	description:				'Set your status, such as omw, here, done, etc.',
	syntax: 						[trainer_states.map(state => state.state).sort().join('/')],
	aliases:						trainer_states.map(state => [state.state, ...state.aliases]).flat().sort(),
	dm:							false,
	usage:						[
										['Set status to here', 'here']
									],
	revision:					'02-02-21',

	// ACTIONS
	actions: [
	
		// SET
		{
			name:					'set',
			synopsis:			'Set your status.',
			description:		'Set your status, such as omw, here, done, etc.',
			syntax:				[trainer_states.map(state => state.state).sort().join('/')],
			aliases:				trainer_states.map(state => [state.state, ...state.aliases]).flat().sort(),
			examples:			[
										['Set status to here', 'here']
									]
		}

	] // ACTIONS

}