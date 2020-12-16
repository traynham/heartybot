/**
 * Get a help document
 * @module list
 * @@name list
 * @category Core
 * @subcategory Help
*/

const help = require(`@data/help`)
const payload_obj = require('@core/util/payload')

/**
 * @name list
 * @param {string} command_set Name of command set.
 * @function
 * @returns {payload}
 * @example
 * list('commands_general')
 */
module.exports = (command_set) => {
	
	let payload = payload_obj()
	
	let set = help[command_set]

	if(!set){
		payload.error = true
		payload.error_message = 'Help command set not found.'
		return payload
	}
	
	payload.values = []
	
	Object.keys(set).forEach(function(key) {

		let command = set[key]

		payload.values.push(
			{
				name: command.name,
				synopsis: command.synopsis,
				description: command.description,
				syntax: command.syntax
			}
		)
		
	})

	return payload

}
