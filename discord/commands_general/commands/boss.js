/**
 * @module Boss
 * @author Jesse Traynham
 * @category Discord Commands
 * @subcategory General
 */

/**
 * @param {object} message Discord message
 * @param {array} argv Arguments array from yargs.
 * @function
 * @name boss
 */

const Discord = require('discord.js');
const bosses = require('@models_lowdb/bosses.js').bosses()
const {detect, discord, help} = require(`@core`)

const {colors} = require(`@config`).discord
const eggs = require(`@data/pokemongo/eggs.json`)

module.exports = {
	name: 'boss',
	meta: help.get('commands_general', 'boss').value,
	cooldown: 5,
	execute(message, argv) {
		
		let args = argv._
		let action = (argv.action ? argv.action : null)

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)

		// EXIT EARLY IF USER DOES NOT MEET ROLE REQUIREMENTS.
		if(action && action.roles && !discord.hasRole(message, action.roles[0])){
			embed.setColor(colors.error)
			embed.setDescription('Sorry, this action requires an admin account.')
			message.channel.send(embed)
			return
		}

		// SHOW TIER
		let detect_boss_tier = detect.boss_tier(args)
		if(!action && !detect_boss_tier.error){
			embed.setTitle(`Boss List (${detect_boss_tier.value})`)
			embed.addField(detect_boss_tier.value, bosses.tiers_obj[detect_boss_tier.value])
			embed.setThumbnail(`https://images.weserv.nl/?w=50&url=${eggs[detect_boss_tier.value.toLowerCase()].asset}`)
			message.channel.send(embed)
			return
		}

		// SHOW SPECIFIC BOSS
		if(!action) {
			console.log(args)
			action = {name: 'show_boss'}
		}

		// RUN ACTION
		if(action) {
			var data = {embed, args, message}
			require(`./boss_actions/${action.name}`)(data)
			return
		}

	} // EXECUTE

} // MODULE.EXPORTS