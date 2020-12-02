/**
 * Detect a valid Pokémon Go code. Detects syntax only.
 * @module Code
 * @author Jesse Traynham
 * @category Core
 * @subcategory Detect
 */

/**
 * @param {string|array} args The string to detect code in.
 * @todo Update res to payload.
 * @function
 * @name code
 */

module.exports = (args) => {

	let res = {
		value: Array.isArray(args) ? args.join('') : args,
		value_formatted: '',
		isNumber: false,
		isLength: 0,
		error: false,
		error_message: ''
	}
	
	res.value = res.value.replace(/ /g, '')
	
	res.isNumber = Number(res.value) ? true : false
	res.isLength = res.value.length == 12 ? true : false		
	
	if(res.isNumber && res.isLength){
		res.value_formatted = res.value.replace(/(....)(....)(....)/, '$1 $2 $3')
	} else {
		res.error = true
		res.error_message = 'No valid code found'
	}
	
	return res

}


