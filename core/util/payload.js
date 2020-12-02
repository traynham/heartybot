/**
	* @module Payload
	* @description A base object to standardize output from modules.
*/

/**
	* Create a payload object
	* @propterty {Function} Create payload object.
	* @returns {payload}
*/
module.exports = () => {

	//const payload_templ = {
	const payload = {
		value: null,
		error: false,
		error_message: ''
	}
	
	//return Object.assign({}, payload_templ)
	return Object.assign({}, payload)

}