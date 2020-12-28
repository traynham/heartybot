const {discord} = require(`@core`)

module.exports = {
	name: 'commands',
	aliases: ['?', 'c', 'com', 'comm', 'command', 'h', 'help', 'man', 'opt', 'options'],
	description: 'View information about raid commands.',
	cooldown: 5,
	execute(message, argv) {
		
		let theEmbed = discord.embedCommand(message, argv._, 'commands')
	
		message.channel.send(theEmbed.value)

	} // EXECUTE
}