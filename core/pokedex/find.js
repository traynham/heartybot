/**
 * Find a trainer record.
 * @module
 * @name pokédex › find
 * @category Core
 * @subcategory Pokédex
 * @todo Fix initial run error.
*/

const TrieSearch = require('trie-search')
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

	const {detect} = require('@core')

	let payload = payload_obj()

	payload.count = 0
	payload.value = {}
	payload.rows = []

	const pokeTrie = new TrieSearch('name')
	pokeTrie.addAll(pokedex)

	let theMon = Array.isArray(req) ? req.join(' ') : req
	
	theMon = theMon.replace('(', '')
	theMon = theMon.replace(')', '')
	theMon = theMon.replace("'", '')
	theMon = theMon.replace('.', '')
	theMon = theMon.toLowerCase().replace('alolan', 'alola')
	
	let isMegaRequest = (detect.boss_tier(theMon).value === 'Mega' ? true : false)
	
//	if(detect_mega.value === 'Mega'){}
//	console.log('MEGA???', isMegaRequest)
	
	
	let records = pokeTrie.get(theMon)

	// THIS DOESN'T WORK IN THE CASE OF THINGS LIKE MEGA CHAR.
	// IT'S PURPOSE IS TO TRY TO FIND THE EXACT POKÉMON REQUESTED.
	//if(req.length == 1 || typeof req === 'string'){	
	//	records = records.filter(pokemon => pokemon.name == pokemon.pokemonId)
	//}
	
	
	// USE DETECT TO DETECT MEGAS AND TREAT RESULTS ACCORDINGLY?
	// 	 name: 'AMPHAROS MEGA',
	
	// TRY TO FIND EXACT MATCH
	let pokemon = records.find( record => record.name.toUpperCase() === theMon.toUpperCase())
	
	// FILTER OUT ERRONEOUS RECORDS.
	if(!pokemon){
	
		pokemon = records.filter(record => {
			// ID IS MEGA, BUT A MEGA WAS NOT REQUESTED, FILTER OUT.
			if(record.name.endsWith('MEGA') && !isMegaRequest) {return false}
			// IF RECORD.FORM IS MISSING, KEEP.
			if(!record.form) { return true }
		})
		
	}
	
	if(!Array.isArray(pokemon)){
		pokemon = [pokemon]
	}
	
	payload.value = pokemon[0]
	payload.rows = pokemon
	payload.count = pokemon.length
	
	/*
//	console.log('POKEMON::', Array.isArray(pokemon))
//	console.log('RECORD ZERO::', Array.isArray(records))
	//payload.value = records[0] // I THINK THIS IS COMPOUNDING THE PROBLEM!
	payload.value = Array.isArray(pokemon) ? pokemon[0] : pokemon
	payload.rows = pokemon
	//payload.count = pokemon.length
	payload.count = Array.isArray(pokemon) ? pokemon.length : 1
*/	
	//if(records.length == 0){
	if(pokemon.length == 0){
		payload.error = true
		payload.error_message = `Could not locate Pokemon using "${theMon}"`
	}

	return payload

}
