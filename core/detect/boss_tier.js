/**
 * Detect a valid tier.
 * @module Boss Tier
 * @author Jesse Traynham
 * @category Core
 * @subcategory Detect
 */

/**
 * @param {string|array} action The tier to test for.
 * @todo Update res to payload.
 * @function
 * @name boss_tier
 */
  
const TrieSearch = require('trie-search')
const tiers_data = require('@data/pokemongo/eggs.json')

module.exports = (action) => {

	let res = {
		q: !Array.isArray(action) ? action.split(' ') : action,
		value: '',
		matched: '',
		mod: '', //The action with the boss tier removed if found.
		asset: '',
		error: false,
		error_message: '',
	}

	let tiers = [
		{name: 'mega', value: 'Mega'},
		{name: 'ex', value: 'Ex'},
	]
	
	// GENERATE A CRAZY AMOUNT OF POSSIBILITIES BECAUSE
	// PEOPLE DON'T READ AND ARE NOT CONSISTENT.
	let levels = ['1', '3', '5', '6']
	let patterns = ['tier', 't', 'l', 'level', 'lvl']
	levels.forEach( tier => {
		patterns.forEach( type => {
			tiers.push({name: `${type} ${tier}`, value: `Tier ${tier}`})
			tiers.push({name: `${type}${tier}`, value: `Tier ${tier}`})
		})
	})

	// TRIE SEARCH
	var trie = new TrieSearch('name')

	trie.addAll(tiers)
	
	let queries = []
	
	if(res.q.length >= 1){
		queries.push(res.q[0] + ' ' + res.q[1])
		queries.push(res.q[0])
		queries.push(res.q[res.q.length - 2] + ' ' + res.q[res.q.length - 1])
		queries.push(res.q[res.q.length - 1] )
	}
	
	let trieGet = undefined
	
	for (let i = 0; i < queries.length; i++) {
			trieGet = trie.get(String(queries[i]))[0]
		if (trieGet) {
			res.matched = queries[i]
			res.mod = res.q.join(' ').replace(queries[i], '').trim()
			break;
		}
	}

	if(trieGet){
		res.value = trieGet.value
		res.asset = tiers_data[trieGet.value.toLowerCase()].asset
	} else {
		res.error = true
		res.error_message = 'No valid tier found.'
	}

	return res
	
}