/**
 * @module Me
 * @author Jesse Traynham
 * @category Discord Commands
 * @subcategory General
 */

/**
 * @param {object} message Discord message
 * @param {array} argv Arguments array from yargs.
 * @function
 * @name me
 */

const Discord = require('discord.js');
const {me, detect, help} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = {
	name: 'me',
	meta: help.get('commands_general', 'me').value,
	async execute(message, argv) {

		let args = argv._
		let action = (argv.action ? argv.action.name : null)
		let value = args.join(' ')

		// I SHOULD MAKE THIS A FIND OR CREATE, AND PASS THE WHOLE MESSAGE OBJECT SO I CAN CREATE.
		let member = await me.find(message.author.id)

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)

		// DETECT TEAM
		let detectTeam = await detect.team(args)
		if(!detectTeam.error){
			action = 'team'
			value = detectTeam.value
		}

		// DETECT CODE
		let detectCode = await detect.code(args)
		if(!detectCode.error){
			action = 'code'
			value = detectCode.value
		}

		// DETECT LEVEL
		let detectLevel = await detect.level(args)			
		if(!detectLevel.error){
			action = 'level'
			value = detectLevel.value
		}
		
		if(!action){
			embed.setColor(colors.error)
			embed.title = 'Error: Action not found.'
			embed.addField('Valid Actions', this.meta.actions.map(action => action.name).sort())
			message.channel.send(embed)
			return
		}

		// CALL SUB COMMAND
		var data = {embed, member, value, message}
		await require(`./me_actions/${action}`)(data)

		message.channel.send(embed)

	} // EXECUTE

} // MODULE.EXPORTS