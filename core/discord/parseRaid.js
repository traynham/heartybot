/**
 * Extract various bits for a raid from a user inputed string.
 *
 * -----
 * @module Parse Raid Functions
 * @author Jesse Traynham
 * @category Core
 * @subcategory Discord
 */


// DEBUG TITLE
// var debug_title = (q, title) => {
// 	if(!q.debug) q = {debug: []}
// 	q.debug.push(`\n**${title}**`)
// }

// DEBUG FIELD/VALUE
// var debug_field = (q, field, value) => {
// 	if(!q.debug) q = {debug: []}
// 	q.debug.push(`> ${field} › ${value}`)
// }



/**
 * @name extract_gym
 * @param {object} args_raw
 * @function
 * @todo Document args_raw object type. Something like {value:'l5 10m frog'}
 */
var extract_gym = async (args_raw) => {

	// debug_title(args_raw, 'Extract Gym')
	// debug_field(args_raw, 'Q', args_raw.value)
	
	const {gyms} = require(`@core`)
	const args = args_raw.value.split(' ')	
	
	let searches = []

	for (let i = args.length; i > 0; i--){
		// THIS SEEMS HACKY. ALL I'M DOING IS IGNORING SINLGE CHARACTER WORDS.
		let check = args.slice(0, i).map(word => {
			word.length > 1 ? word : null
			//if(word.length = 1 || word > 10 ) return null
			//return word
		})
		if(!check.includes(null)) {
			searches.push(args.slice(0, i))
		}
	}
	
	for (let i = 0; i < args.length; i++){
		// THIS SEEMS HACKY. ALL I'M DOING IS IGNORING SINLGE CHARACTER WORDS.
		let check = args.slice(i, args.length).map(word => {
			//word.length > 1 ? word : null 

// THIS BROKE.?????? (was using = instead of ==, so look again.)
			if(word.length == 1 || Number(word) > 10 ) return null
			return word
		})
		if(!check.includes(null)) {
			searches.push(args.slice(i, args.length))
		}
	}
//console.log('SEARCHES: ', searches)

	for await (let term of searches) {
		
		if (!Number.isInteger(Number(term))) {

			//let result = await gyms.find({args: term})
			let result = await gyms.find(term)

			if(result.rows.length > 0){
				
				// debug_field(args_raw, 'MATCH', term.join(' '))
				// debug_field(args_raw, 'COUNT', result.rows.length)
				// debug_field(args_raw, 'VALUE', ':white_check_mark: ' + result.gym.dataValues.name)
				// debug_field(args_raw, 'METHOD', result.method)

				args_raw.value = args_raw.value.replace(term.join(' '), '').trim()
				return result
			}
		}
		
	}
	
	// debug_field(args_raw, 'MATCH', ':x: NO MATCH')
	
	return null
	
}

// EXTRACT BOSS
/**
 * @name extract_boss
 * @param {object} args_raw
 * @function
 * @todo Document args_raw object type. Something like {value:'l5 10m frog'}
 */
var extract_boss = (args_raw) => {
	
	const {detect} = require(`@core`)
	const args = args_raw.value.split(' ')

	/*
		This grabs the first three items, tests, then first two, test, then first, tests.
	*/

	// FROM FRONT
	for (let i = 3; i > 0; i--){

		let q = args.slice(0, i)
		let detectBoss = detect.boss(q)

		if(!detectBoss.error){
			
			//args_raw.value = args_raw.value.replace(q.join(' '), '').trim()
			args_raw.value = args_raw.value.replace(detectBoss.matched, '').trim()
			return detectBoss
		}

	} // FOR - LOCATE BOSS
	
	//FROM BACK
	let back = args.slice(-3)
	for (let i = 0; i < 3; i++){

		let q = back.slice(i, back.length)
		let detectBoss = detect.boss(q)
		
		if(!detectBoss.error){
			args_raw.value = args_raw.value.replace(q.join(' '), '').trim()
			return detectBoss
		}

	} // FOR - LOCATE BOSS
	
	return null
	
} // EXTRACT BOSS

// EXTRACT TIME
/**
 * @name extract_time
 * @param {object} args_raw
 * @function
 * @todo Document args_raw object type. Something like {value:'l5 10m frog'}
 */
var extract_time = (args) => {

	const {detect} = require(`@core`)
	const detectTime = detect.time(args.value)
	
	if(!detectTime.error){
		args.value = args.value.replace(detectTime.matched, '').trim()
		return detectTime
	}
	
	return null

} // EXTRACT TIME

// EXTRACT DURATION
/**
 * @name extract_duration
 * @param {object} args_raw
 * @function
 * @todo Document args_raw object type. Something like {value:'l5 10m frog'}
 */
var extract_duration = (args) => {

	const {detect} = require(`@core`)
	const detectTime = detect.duration(args.value)
	
	if(!detectTime.error){
		
		args.value = args.value.replace(detectTime.matched, '').trim()
		return detectTime
	}
	
	return null

} // EXTRACT DURATION


module.exports = {
	extract_gym: extract_gym,
	extract_boss: extract_boss,
	extract_duration: extract_duration,
	extract_time: extract_time
}
