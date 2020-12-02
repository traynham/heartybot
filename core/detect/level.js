/**
 * Detect valid level.
 *
 * -----
 * @module Level
 * @author Jesse Traynham
 * @category Core
 * @subcategory Detect
 */

/**
 * @param {string|array} level The level value to check.
 * @todo Update res to payload.
 * @function
 * @name level
 */

module.exports = (level) => {

	let res = {
		value: Array.isArray(level) ? level.join('') : level,
		error: false,
		error_message: '',
		isNumber: Number(level) ? true : false
	}
	//console.log(level)
	
	if(!res.isNumber){
		res.error = true
		res.error_message = 'Level must be a number'
		return res
	}
	
	if(level < 10 || level > 40){
		res.error = true
		res.error_message = 'Level must be a number between 10-40'
		return res
	}
	
	return res

}