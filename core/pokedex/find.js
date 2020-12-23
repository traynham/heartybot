/**
 * Find a trainer record.
 * @module
 * @name pokédex › find
 * @category Core
 * @subcategory Pokédex
 * @todo Fix initial run error.
*/

const TrieSearch = require('trie-search')
//const pokedex = require('@data/pokemongo/pokedex.json')
const pokedex = require('@data/cache/pokemongo/pokedex.json') // causes error on initial run!
const payload_obj = require('@core/util/payload')

/**
 * @name find
 * @param {string|strng[]} req The Pokémon to search for.
 * @function
 * @returns {payload}
 * @example
 * // Find "Pikachu" using "Pika"
 * find('Pika')
 * @example
 * // Find "['Mega', 'Char']"
 * find(['Mega', 'Char'])
 */
module.exports = (req) => {

	let payload = payload_obj()

	payload.count = 0
	payload.value = {}
	payload.rows = []

	const pokeTrie = new TrieSearch('name')
	pokeTrie.addAll(pokedex)

	let theMon = Array.isArray(req) ? req.join(' ') : req
	
	theMon = theMon.replace('(', '')
	theMon = theMon.replace(')', '')
	theMon = theMon.toLowerCase().replace('alolan', 'alola')
	
	let records = pokeTrie.get(theMon)

	// THIS DOESN'T WORK IN THE CASE OF THINGS LIKE MEGA CHAR.
	// IT'S PURPOSE IS TO TRY TO FIND THE EXACT POKÉMON REQUESTED.
	//if(req.length == 1 || typeof req === 'string'){	
	//	records = records.filter(pokemon => pokemon.name == pokemon.pokemonId)
	//}
	
	payload.value = records[0]
	payload.rows = records
	payload.count = records.length
	
	if(records.length == 0){
		payload.error = true
		payload.error_message = `Could not locate Pokemon using "${theMon}"`
	}

	return payload

}
