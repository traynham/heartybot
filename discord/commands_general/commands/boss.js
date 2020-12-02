const dateFormat = require('dateformat')
const Discord = require('discord.js');
const bosses = require('@models_lowdb/bosses.js').bosses()
const {detect, discord} = require(`@core`)

const {colors} = require(`@config`).discord
const eggs = require(`@data/pokemongo/eggs.json`)

module.exports = {
	name: 'boss',
	aliases: ['b', 'bos'],
	actions_admin: ['add', 'remove', 'update'],
	actions_list: ['add', 'perfect', 'remove', 'type', 'update'],
	synopsis: 'Show bosses.',
	description: 'Display current Raid Bosses',
	syntax: ['boss {boss name}'],
	usage: {
		'To show bosses:': 'boss',
		'To show specific boss:': 'boss darkari',
		'To show a tier': 'boss l5'
	},
	cooldown: 5,
	execute(message, argv) {
	
		console.log('ENTERING MAIN !!BOSS COMMAND!!!')
		console.log('ARGV: ', argv)
		let args = argv._
		let action = null
	
	/**
		ERROR: Need to run logic for when multiple bosses are found. For example, "alo" will only find the first match, obviously.
	**/

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)

		// EXIT EARLY IF ADMIN ACTION ATTEMPT BY NON-ADMIN.
		if(this.actions_admin.includes(args[0]) && !discord.isAdmin(message)){			
			embed.setColor(colors.error)
			embed.setDescription('Sorry, this action requires an admin account.')
			message.channel.send(embed)
			return
		}
		
		// ACTION: ADD
		if(args[0] === 'add'){
			action = 'add'
			args.shift()
		}
		
		// ACTION: REMOVE
		if(args[0] === 'remove' || args[0] === 'rem' || args[0] === 'rm'){
			action = 'remove'
			args.shift()
		}
	
		// ACTION: UPDATE
		if(args[0] === 'update'){
			action = 'update'
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
		if(!action && args.length) {
			console.log(args)
			action = 'show_boss'
		}
		
		// RUN ACTION
		if(action) {
			var data = {embed, args, message}
			require(`./boss_actions/${action}`)(data)
			return
		}

		// FULL BOSS LIST CARD			
		if(args.length == 0){
			embed.setTitle('Boss List')
			discord.setThumbnail(embed, './public/images/icons/gym.png', 'gym.png')
			bosses.tiers.forEach(tier => embed.addField(tier.name, tier.value.join(', ')) )
			//embed.setFooter('Updated: ' + bosses.date)
			embed.setFooter('Updated: ' + dateFormat(bosses.date, "m/dd/yy h:MM TT"))
			message.channel.send(embed)
			return
		}

	} // EXECUTE

} // MODULE.EXPORTS