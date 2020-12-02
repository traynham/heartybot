/**
 * Try to find a duration in a string and return current date/time plus the duration.
 *
 * -----
 * @module Duration
 * @author Jesse Traynham
 * @category Core
 * @subcategory Detect
 */

/**
 * @param {string|array} args The string to detect duration in.
 * @todo Update res to payload.
 * @function
 * @name duration
 */

module.exports = (args) => {

	const { add } = require('date-fns')

	// RESPONSE
	let res = {
		q: Array.isArray(args) ? args.join(' ') : args,		// FLATTEN ARGS IF NEEDED.
		value: null,											// FOUND TIME VALUE
		matched: null,										// Matched String
		type: null, 											// TYPE OF DETECTION (DURATION|TIME)
		error: false,										// ERROR: BOOLEAN
		error_message: null									// ERROR MESSAGE STRING
	}

	let detectDur = res.q.match(/(?<minutes>\d+) ?(?<type>minutes|minute|mins|min|m)?\b/i)

	if(detectDur && detectDur.groups && detectDur.groups.minutes < 100) {
		res.value = add(new Date(), {minutes: detectDur.groups.minutes})
		res.matched = detectDur[0]
		res.type = 'duration'
		return res			
	}

	// FAILED AT THIS POINT
	res.error = true
	res.error_message = 'No time detected.'
	
	return res

}