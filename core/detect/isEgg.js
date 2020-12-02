/**
 * Strict detection of an egg/tier name.
 *
 * **NOTE:** Q can only be one of the official values:
 *
 * `['Tier 1', 'Tier 3', 'Tier 5', 'Mega']`
 *
 * This function should be used after search values are resolved and stored.
 *
 * -----
 * @module isEgg
 * @author Jesse Traynham
 * @category Core
 * @subcategory Detect
 */

/**
 * @param {string} q Tier to match.
 * @function
 * @name isEgg
 * @returns {payload}
 */

const payload_obj = require('@core/util/payload')

module.exports = (q) => {

	let payload = payload_obj()
	
	payload.q = q

	payload.value = ['Tier 1', 'Tier 3', 'Tier 5', 'Mega'].includes(q)

	if(!payload.value){
		payload.error = true
		payload.error_message = `"${q}" is not an egg.`
	}
	
	return payload
	
}