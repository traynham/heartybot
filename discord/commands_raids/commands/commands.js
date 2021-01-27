const {discord, help} = require(`@core`)

module.exports = {
	name: 'commands',
	meta: help.get('commands_raids', 'commands').value,
	execute(message, argv) {

		let theEmbed = discord.embedCommand(message, argv._, 'raid_commands')
		message.channel.send(theEmbed.value)

	} // EXECUTE
	
	
}