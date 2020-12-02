const TrieSearch = require('trie-search')

const pokedex = require('@data/pokemongo/pokedex.json')

/**
	# Get
	Returns one pokemon. Returns an error if zero or more than one pokemon are found.
	
**/

/*
module.exports = (req) => {

	let res = {
		//value: {},
		value: null,
		found: [],
		error: false,
		error_message: ''
	}
	
	const pokeTrie = new TrieSearch('name')
	pokeTrie.addAll(pokedex)

	const theMon = Array.isArray(req) ? req.join(' ') : req

	let records = pokeTrie.get(theMon)

//console.log(records)
//console.log('RECORD COUNT: ', records.length)
//console.log('REQ COUNT: ', req.length)

//console.log('===========================')
// THIS STILL LEAVES OUT NON-NORMAL FORMS. :(
const result = records.filter(pokemon => !pokemon.form)

//console.log('RESULT: ', result)

//console.log('===========================')


	// WHAT IN THE WORLD IS THIS FOR. DERP.
//	if(req.length == 1){	
//		records = records.filter(pokemon => pokemon.name == pokemon.uniqueId)
//		records = records.filter(pokemon => pokemon.name == pokemon.pokemonId)
//	}


	//if(records.length == 1){
	if(result.length == 1){
		//res.value = records[0]
		res.value = result[0]
	}
	
	//if(records.length == 0){
	if(result.length == 0){
		res.error = true
		res.error_message = `Could not locate Pokemon using "${theMon}"`
	}

	//if(records.length > 1){
	if(result.length > 1){
		res.found = result
		res.error = true
		res.error_message = `To many Pokemon located using "${theMon}"`
	}
	
	return res

}
*/