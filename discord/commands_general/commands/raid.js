const Discord = require('discord.js')
const {discord, help} = require(`@core`)
const dispatcher = require('./raid_core/dispatcher')
const payload_obj = require('@core/util/payload')
const lowdb_raids = require('@models_lowdb/raids.js')
const {colors, prefix: p, syntax_required: sr} = require('@config').discord

module.exports = {
	name: 'raid',
	meta: help.get('commands_general', 'raid').value,
	cooldown: 5,
	async execute(message, argv) {
	
		let payload = {
			...payload_obj(), 
			...{pokemon: null, time: null, gym: null, message: message}
		}
		let args = argv._
		let q = {value: args.join(' ')} // MUTABLE
		let action = (argv.action ? argv.action.name : '')

		// LIST
		if(action == 'list'){
			require('./raid_core/list')(message)
			return
		}

		// ARCHIVE
		// * RETURN ERRORS IF NEEDED.
		if(action == 'archive'){
			if(args.length){
				let archive = lowdb_raids.raids_archive(args.join(' '))
				if(!archive.error){
					const fetchedChannel = message.guild.channels.cache.get(archive.value.channel);
					fetchedChannel.delete();
				}
			} else {
				let embed = new Discord.MessageEmbed()
				embed.setColor(colors.error)
				embed.addField('syntax', '`' + `${p}raid archive ${sr[0]}gym${sr[1]}` + '`')
				message.channel.send(embed)
				console.log('SU: Tried to archive, but did not pass gym search.')
			}
			return
		}
		
		// SHOW
		if(action == 'show'){
			let raid = lowdb_raids.raids_find(args.join(''))
			discord.embedRaid(raid, {message: message, update: true})
			return
		}

		// NEW
		if(action == 'new'){
			dispatcher(payload)
			return
		}
		
		// WEB
		if(action == 'web'){
			console.log('This is a "web" request.')
			// NEED TO CREATE AN EMBED THAT SHOWS A LINK TO CLICK ON TO FINISH THE PROCESS.
			return
		}

		// REPORT
		payload.time = discord.parseRaid.extract_time(q)		// TRY TIME
		payload.pokemon = discord.parseRaid.extract_boss(q)	// TRY BOSS
		payload.gym = await discord.parseRaid.extract_gym(q)	// TRY GYM

		if(!payload.pokemon){payload.pokemon = discord.parseRaid.extract_boss(q)}	// TRY BOSS AGAIN
		if(!payload.time){payload.time = discord.parseRaid.extract_duration(q)}		// TRY DURATION
		if(!payload.gym){payload.gym = await discord.parseRaid.extract_gym(q)}		// TRY GYM

		dispatcher(payload)

	} // EXECUTE

} // MODULE.EXPORTS