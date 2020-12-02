/**
 * Detect valid team. Uses a Trie Search to locate desired team value.
 *
 * -----
 * @module Team
 * @author Jesse Traynham
 * @category Core
 * @subcategory Detect
 */

/**
 * @param {string|array} args The team value to check.
 * @todo Update res to payload.
 * @function
 * @name team
 */

const TrieSearch = require('trie-search')

module.exports = (args) => {

	let res = {
		value: Array.isArray(args) ? String(args[0]) : args,
		error: false,
		error_message: ''
	}

	if(!res.value) {
		res.error = true
		res.error_message = '"args" cannot be empty.'
		return res
	}

	let teams = [
		{name: 'red', value: 'Valor'},
		{name: 'valor', value: 'Valor'},
		{name: 'blue', value: 'Mystic'},
		{name: 'mystic', value: 'Mystic'},
		{name: 'yellow', value: 'Instinct'},
		{name: 'instinct', value: 'Instinct'},
		{name: 'mixed', value: 'Mixed'},
	]

	// TRIE SEARCH
	var teamTrie = new TrieSearch('name')

	teamTrie.addAll(teams);

	let result = teamTrie.get(res.value)[0]
	
	if(result){
		res.value = result.value
	} else {
		res.error = true
		res.error_message = 'No valid team found'
	}

	return res

}


