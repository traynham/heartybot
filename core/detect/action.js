/**
 * Detect a valid action. Used in the me command only.
 *
 * -----
 * @module Action
 * @author Jesse Traynham
 * @category Core
 * @subcategory Detect
 */

/**
 * @param {string|string[]} action The gym name or channel snowflake.
 * @todo Update res to payload.
 * @member Action
 * @function
 * @name action
 */
 
const TrieSearch = require('trie-search')
 

module.exports = (action) => {

	let res = {
		value: Array.isArray(action) ? String(action[0]) : action,
		error: false,
		error_message: ''
	}

	let actions = [
		{ name: 'cd', value: 'cd' },
		{ name: 'code', value: 'code' },
		{ name: 'community day', value: 'cd' },
		{ name: 'hide', value: 'hide' },
		{ name: 'level', value: 'level' },
		{ name: 'lvl', value: 'level' },
		{ name: 'privacy', value: 'privacy' },
		{ name: 'private', value: 'privacy' },
		{ name: 'show', value: 'show' },
		{ name: 'started', value: 'started' },
		{ name: 'team', value: 'team' }
	]

	// TRIE SEARCH EXAMPLE
	var actionTrie = new TrieSearch('name')

	actionTrie.addAll(actions)

	let detectAction = actionTrie.get(res.value)[0]

	if (detectAction) {

		res.value = detectAction.value
	} else {
		res.error = true
		res.error_message = 'No valid action found.'
	}

	return res

}