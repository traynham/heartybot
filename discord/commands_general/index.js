module.exports = (client, message) => {
	
	const { prefix } = client.config
	
	let commandString = message.content.slice(prefix.length).toLowerCase() // Command string without prefix.

	var argv = require('yargs-parser')(commandString, {
		boolean: ['d', 's', 'v', 'debug'],
		configuration: {
			'short-option-groups': true
		}
	})
	
	const commandName = argv._.shift()
	const args = argv._
		
	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))
	
	if (!command) return;
	
	// RUDAMENTARY HELP RESPONSE - TIE INTO MY HELP OR SOMETHING...
	if (command.args && !args.length) {

		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}
	
// cooldowns is not working for some reason
/*
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
*/
	try {
		command.execute(message, argv)
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
	

}