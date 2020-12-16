/**
 * Get a help document
 * @module get
 * @@name get
 * @category Core
 * @subcategory Help
*/

//const {prefix: p, syntax_optional: so, syntax_required: sr} = require('@config').discord

const help = require(`@data/help`)
const payload_obj = require('@core/util/payload')

/**
 * @name get
 * @param {string} command_set Name of command set.
 * @param {string} command Name of command.
 * @function
 * @returns {payload}
 * @example
 * get('commands_general', 'boss')
 */
module.exports = (command_set, command) => {
	
	let payload = payload_obj()
	
	let set = help[command_set]

	if(!set){
		payload.error = true
		payload.error_message = 'Help command set not found.'
		return payload
	}
	
	let help_document = set[command]
	
	if(!help_document){
		payload.error = true
		payload.error_message = 'Help command not found.'
		return payload
	}
	
	// Problem: prefix and other things are not getting populated properly.
	console.log(help_document)
	
	payload.value = help_document
	
	return payload

}
