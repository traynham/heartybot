const {discord, help} = require(`@core`)

module.exports = {
	name: 'commands',
	meta: help.get('commands_raids', 'help').value,
	aliases: ['?', 'c', 'com', 'comm', 'command', 'h', 'help', 'man', 'opt', 'options'],
	description: 'View information about raid commands.',
	cooldown: 5,
	
	execute(message, argv) {

		let theEmbed = discord.embedCommand(message, argv._, 'raid_commands')
	
		message.channel.send(theEmbed.value)

	} // EXECUTE
	
	
}