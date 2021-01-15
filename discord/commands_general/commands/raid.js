const {discord, help} = require(`@core`)
const debug = require('./raid_core/debug')
const dispatcher = require('./raid_core/dispatcher')

module.exports = {
	name: 'raid',
	meta: help.get('commands_general', 'raid').value,
	cooldown: 5,
	async execute(message, argv) {
	
		console.log('-----------------------------------')
	
		let args = argv._
		
		// IGNORE LIST AND LS COMMAND AS IT IS DEFAULT.
		if(['list', 'ls'].includes(args[0])){
			args.shift()
		}

		if(args.length == 0){
			//console.log('Product raid report.')
			require('./raid_core/list')(message)
			return
		}

		let args_string = args.join(' ')

		//let q = {value: args.join(' '), debug: []} // MUTABLE
		let q = {value: args.join(' ')} // MUTABLE

		var payload = {
			pokemon: null,
			time: null,
			gym: null,
			message: message
		}

		if(args_string == 'new'){
			console.log('this is a "new" request')
			dispatcher(payload)
			// NEED RETURN HERE?
		}

		if(args_string != 'new'){
			payload.time = discord.parseRaid.extract_time(q)		// TRY TIME
			payload.pokemon = discord.parseRaid.extract_boss(q)		// TRY BOSS
			payload.gym = await discord.parseRaid.extract_gym(q)	// TRY GYM

			if(!payload.pokemon){ payload.pokemon = discord.parseRaid.extract_boss(q) }	// TRY BOSS AGAIN
			if(!payload.time){ payload.time = discord.parseRaid.extract_duration(q) }	// TRY DURATION
			if(!payload.gym){ payload.gym = await discord.parseRaid.extract_gym(q)}	// TRY GYM

			if(argv.debug){
				debug(q, payload, message)
			}
			
			dispatcher(payload)
		
		} // IF NOT NEW


	} // EXECUTE

} // MODULE.EXPORTS