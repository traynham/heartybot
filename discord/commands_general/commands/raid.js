const {discord, help} = require(`@core`)
const dispatcher = require('./raid_core/dispatcher')
const payload_obj = require('@core/util/payload')
//const lowdb_raids = require('@models_lowdb/raids.js')

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

		// LIST
		if(args.length == 0 || ['list', 'ls'].includes(args[0])){
			require('./raid_core/list')(message)
			return
		}
/*
		// ARCHIVE
		if(args[0] == 'archive'){
			console.log('this is a "archive" request')
			args.shift()
			console.log(args)
			
			if(args.length){
				// Need to remove channel first?
				
				let raid_record = lowdb_raids.raids_find(args.join(''))
				console.log(raid_record)
				//console.log(
				//	lowdb_raids.raids_archive(args.join(' '))
				//)
			} else {
				console.log('SU: Tried to archive, but did not pass gym search.')
			}
			
			return
		}
*/
		// NEW
		if(args[0] == 'new'){
			console.log('this is a "new" request')
			dispatcher(payload)
			return
		}
		
		// WEB
		if(args[0] == 'web'){
			console.log('this is a "web" request')
			// NEED TO CREATE AN EMBED THAT SHOWS A LINK TO CLICK ON TO FINISH THE PROCESS.
			return
		}

		// REPORT
		payload.time = discord.parseRaid.extract_time(q)		// TRY TIME
		payload.pokemon = discord.parseRaid.extract_boss(q)	// TRY BOSS
		payload.gym = await discord.parseRaid.extract_gym(q)	// TRY GYM

		if(!payload.pokemon){ payload.pokemon = discord.parseRaid.extract_boss(q) }	// TRY BOSS AGAIN
		if(!payload.time){ payload.time = discord.parseRaid.extract_duration(q) }		// TRY DURATION
		if(!payload.gym){ payload.gym = await discord.parseRaid.extract_gym(q)}			// TRY GYM

		dispatcher(payload)

	} // EXECUTE

} // MODULE.EXPORTS