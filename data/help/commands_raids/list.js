const {syntax_optional: so} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'list',
	synopsis:					'List trainers.',
	description:				'List trainers and their status for the raid.',
	syntax:						`list ${so[0]}state${so[1]}`,
	aliases:						['l', 'ls', 'lis'],
	dm:							false,
	usage:						[
										['To list trainers:', 'list'],
										['To show trainers that are "here":', 'list here']
									],
	revision:					'01-28-21',

	// ACTIONS
	actions: [
	
		// SHOW
		{
			name:					'show',
			aliases:				['sh'],
			default:				true,
			synopsis:			'List trainers.',
			description:		'List trainers and their status for the raid.',
			syntax:				'list',
			examples:			[
										['To list trainers:', 'list']
									]
		}

	] // ACTIONS

}