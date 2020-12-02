/**
 * Attempt to extract a time in a string and return as date/time in payload
 *
 * -----
 * @module Time
 * @author Jesse Traynham
 * @category Core
 * @subcategory Detect
 */

/**
 * @param {string|array} args The string to detect time in.
 * @todo Update res to payload.
 * @todo Refactor without Moment.
 * @function
 * @name time
 * @returns {payload} Returns additional time, matched, and type in playload.
 */

module.exports = (args) => {

	const Moment = require('moment')	
	var moment = Moment()

	// RESPONSE
	let res = {
		q: Array.isArray(args) ? args.join(' ') : args,		// FLATTEN ARGS IF NEEDED.
		value: '',											// FOUND TIME VALUE
		matched: '',										// Matched String
		type: '', 											// TYPE OF DETECTION (DURATION|TIME)
		error: false,										// ERROR: BOOLEAN
		error_message: ''									// ERROR MESSAGE STRING
	}
	
	// TIME USING NAMED MATCH GROUPS
	let detectTime = res.q.match(/(?<hour>\d\d?):?(?<minutes>\d\d) ?(?<meridiem>am?|pm?)?\b/i)

	if(detectTime && detectTime.groups) {
		
		let time = moment.hour(detectTime.groups.hour).minutes(detectTime.groups.minutes).seconds('00')

		// ADJUST FOR 24 HOUR TIME, IF NEEDED.
		if(time.diff(Moment()) < 0 && !['a', 'am'].includes(detectTime.groups.meridiem)){
			time.add(12, 'h')
		}
	
		//res.time = time
		//res.value = time
		res.time = time.toDate()
		res.value = time.toDate()
		res.matched = detectTime[0]
		res.type = 'time'
		return res
	}

	// FAILED AT THIS POINT
	res.error = true
	res.error_message = 'No time detected.'
	
	return res

}