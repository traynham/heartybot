/**
 * Find a Pokémon Type
 * @module
 * @name pokédex › type
 * @category Core
 * @subcategory Pokédex
*/

const TrieSearch = require('trie-search')

const types = require('@data/pokemongo/types.json')
const payload_obj = require('@core/util/payload')

/**
	# Type
	Searches for a type.
	
	req = type | all
	
**/

/**
 * @name type
 * @param {string|strng[]} req The type to get..
 * @function
 * @returns {payload}
 * @example
 * // Find "Dark"
 * type('Dark')
 * @example
  * // Find all
  * type('all')
 * @example
 * // Find "Bogus"
 * type('Bogus')
 */
module.exports = (req) => {

	let payload = payload_obj()
	
	payload.count = 0

	let records = []
	let type = Array.isArray(req) ? req.join(' ') : req

	if(type == 'all') {
		records = types.types
	} else {
		let pokeTrie = new TrieSearch('name')
		pokeTrie.addAll(types.types)
		records = pokeTrie.get(type)
	}
	
	payload.count = records.length
	
	if(records.length == 0){
		payload.error = true
		payload.error_message = `Could not locate type using "${type}"`
		return payload
	}
	
	records.forEach(function(record) {

		// STRONG
		record.strong = `${record.name}, greater, ${record.super_effective}`.toLowerCase().split(', ')

		// WEAK
		record.weak = `${record.name}, less, ${record.weak_to}`.toLowerCase().split(', ')

	})
	
	payload.value = records[0]
	//payload.values = records
	payload.rows = records

	return payload

}
