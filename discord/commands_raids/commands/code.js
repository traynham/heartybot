const {help} = require(`@core`)

module.exports = {
	name: 'code',
	meta: help.get('commands_raids', 'code').value,
	execute(message, argv) {

		const command = message.client.commands.find(cmd => cmd.name =='code')

		// INVOKE REGULAR CODE COMMAND FROM COMMANDS.
		command.execute(message, argv)

	}
}