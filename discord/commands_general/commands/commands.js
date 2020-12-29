/**
 * @module Commands
 * @author Jesse Traynham
 * @category Discord Commands
 * @subcategory General
 */

/**
 * @param {object} message Discord message
 * @param {array} argv Arguments array from yargs.
 * @function
 * @name commands
 */

const {discord, help} = require(`@core`)

module.exports = {
	name: 'commands',
	meta: help.get('commands_general', 'help').value,
	cooldown: 5,
	execute(message, argv) {
		
		let theEmbed = discord.embedCommand(message, argv._, 'commands')
	
		message.channel.send(theEmbed.value)

	} // EXECUTE
}