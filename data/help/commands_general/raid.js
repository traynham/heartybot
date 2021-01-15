const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

module.exports = {

	// GENERAL
	name:							'raid',
	synopsis:					'List/Create Raids',
	description:				'Report and list raids.',
	syntax:						`${p}raid ${so[0]}action${so[1]}`,
	aliases:						['r', 'raids'],
	dm:							false,
	revision:					'01-13-21',
	usage: 						[
										['List Raids:', `${p}raids`],
										['Report a raid:', `${p}raid ${sr[0]}boss${sr[1]} ${sr[0]}gym${sr[1]} ${sr[0]}time${sr[1]}`]
									],
	show_help_footer:			true,

	// ACTIONS
	actions: [

		// HELP
		{
			name:					'help',
			synopsis:			'Show Help',
			description:		'Show Help',
			syntax:				`${p}raid ${sr[0]}help${sr[1]} ${so[0]}action${so[1]}`,
			examples:			[
										["Show raid help.", `?raid`],
										["Show raid action help.", `?raid ${sr[0]}action${sr[1]}`]
									]
		},
		
		// List
		{
			name:					'list',
			synopsis:			'List raids',
			description:		'List active raids',
			default:				true,
			syntax:				`${p}raid`,
			examples:			[
										["List raids.", `${p}raid`],
										["List raids.", `${p}r`]
									]
		},
		
		// List
		{
			name:					'new',
			synopsis:			'Report new raids',
			description:		'Report a new raid by responding to prompts.',
			syntax:				`${p}raid ${sr[0]}new${sr[1]}`,
			examples:			[
										["Report raid.", `${p}raid new`],
										["Report raid alternate.", `${p}r new`]
									]
		},

		// Report
		{
			name:					'report',
			synopsis:			'Report raid',
			description:		'Report a raid by passing boss, gym, and time. If the bot cannot interpret or verify information, it will ask for additional information via additional messages.',
			syntax:				`${p}raid ${sr[0]}boss${sr[1]} ${sr[0]}gym${sr[1]} ${sr[0]}time${sr[1]}`,
			examples:			[
										["Report a Tier 5 at frog in 30 minuts.", `${p}r l5 frog 30m`]
									],
		}

		// ADD ADMIN OR SU COMMANDS TO REMOVE A RAID? BETTER TO PUT IN RAID CHANNEL?
		// ADD WEB COMMAND TO REPORT RAID VIA WEB INTERFACE.

	] // ACTIONS

}