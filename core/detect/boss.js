/**
 * Detect a boss.
 * @module Boss
 * @author Jesse Traynham
 * @category Core
 * @subcategory Detect
 */

/**
 * @param {string|string[]} args The string to detect boss in.
 * @todo Update res to payload.
 * @todo Fix bad tiers logic mentioned in code.
 * @function
 * @name boss
 */
 
const TrieSearch = require('trie-search')

const bosses = require('@models_lowdb/bosses.js').bosses() // Raw BOSSESS JSON.

module.exports = (args) => {

	const {detect} = require(`@core`)

	let res = {
		q: Array.isArray(args) ? args.join(' ') : args,
		value: null,
		count: 0,
		asset: '',
		error: false,
		error_message: ''
	}

	// RETURN IF BLANK VALUE
	if(!res.q) {
		res.error = true
		res.error_message = 'No query provided.'
		return res
	}

	// IF ONE WORD, CHECK FOR TIER FIRST. CHECK MULT-WORD LATER.
	if(res.q.split(' ').length == 1){
		// RETURN IF TIER IS DETECTED
		let detect_tier = detect.boss_tier(res.q)
	
		if(!detect_tier.error) {
			res.value = detect_tier.value
			res.type = 'tier'
			return res
		}
		
	}

	// SEARCH THROUGH BOSSES
	var bossTrie = new TrieSearch('name')
	bossTrie.addAll(bosses.trie);

	let result = bossTrie.get(res.q)

	if(result.length > 1){
		let bosses = result.map(boss => boss.name)
		res.value = bosses
		res.count = bosses.length
		res.error = true
		res.error_message = 'To many Pokémon found.'
		return res
	}

	if(result.length == 1){
		res.asset = result[0].asset
		res.value = result[0].value
		res.count = 1
		return res
	}

	// TEST TIER AGAIN WITH MULTIPLE WORDS.
	let detect_tier = detect.boss_tier(res.q)
	
	if(!detect_tier.error) {
		res.value = detect_tier.value
		res.type = 'tier'
		return res
	}
	
	if(result.length == 0){
		//res.count = 1
		res.count = 0
		res.error = true
		res.error_message = 'No valid boss found'
		return res
	}
	
}