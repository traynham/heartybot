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
	actions: ['code', 'hide', 'level', 'privacy', 'show', 'started', 'team'],
	cooldown: 5,
	async execute(message, argv) {

		let args = argv._

		// I SHOULD MAKE THIS A FIND OR CREATE, AND PASS THE WHOLE MESSAGE OBJECT SO I CAN CREATE.
		let member = await me.find(message.author.id)
		//let privacy = member.privacy.split(',')

		let action = null
		let value = null
		let content = null

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

		if(args.length == 0){
			action = 'show_card'
		}

		if(!action){

			// DETECT ACTION
			let detectAction = await detect.action(args)

			if(!detectAction.error){
				action = detectAction.value
				args.shift()
				value = args.join(' ')
			} else if(args.length > 0) {
				action = 'error'
			}

		}

		// CALL SUB COMMAND			
		var data = {embed, member, value, message}
		await require(`./me_actions/${action}`)(data)

		message.channel.send(content, embed);

	} // EXECUTE

} // MODULE.EXPORTS