//const Discord = require('discord.js');

//const {me, qr, detect} = require(`@core`)

//const {colors, emoji} = require(`@config`).discord

module.exports = {
	name: 'code',
	aliases: [],
	synopsis: 'Show a trainer code!',
	description: 'Display a Pokémon Go friend code.',
	syntax: ['code {@mention/code}'],
	usage: {
		'To show your code:': 'code',
		'To show a code by mention': 'code @discord_nick',
		'Display code card for a code': 'code 123456789012'
	},
	show_help_footer: true,
	cooldown: 5,
	execute(message, argv) {

		const command = message.client.commands.find(cmd => cmd.name =='code')

		// INVOKE REGULAR CODE COMMAND FROM COMMANDS.
		command.execute(message, argv)

	}
}