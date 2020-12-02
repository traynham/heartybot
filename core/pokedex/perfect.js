/**
 * Get perfect CPs for a Pokémon.
 * @module
 * @name pokédex › perfect
 * @category Core
 * @subcategory Pokédex
*/

const find = require('./find')
const payload_obj = require('@core/util/payload')

let cpMultiplier = [0.094, 0.16639787, 0.21573247, 0.25572005, 0.29024988, 0.3210876, 0.34921268, 0.3752356, 0.39956728, 0.4225, 0.44310755, 0.4627984, 0.48168495, 0.49985844, 0.51739395, 0.5343543, 0.5507927, 0.5667545, 0.5822789, 0.5974, 0.6121573, 0.6265671, 0.64065295, 0.65443563, 0.667934, 0.6811649, 0.69414365, 0.7068842, 0.7193991, 0.7317, 0.7377695, 0.74378943, 0.74976104, 0.7556855, 0.76156384, 0.76739717, 0.7731865, 0.77893275, 0.784637, 0.7903, 0.7953, 0.8003, 0.8053, 0.8103, 0.8153]

/**
 * @name perfect
 * @param {string|strng[]} pokemon The Pokémon to search for.
 * @function
 * @returns {payload}
 * @example
 * // Get perfect CPs for "Darkrai"
 * perfect('Darkrai')
 * @example
 * // Get perfect CPs for "Bogus"
 * perfect('Bogus')
 */
module.exports = (pokemon) => {

	let payload = payload_obj()
	
	payload.value = {}

	let results = find(pokemon)
	
	if(results.error) {
		payload.error = true
		payload.error_message = results.error_message
		return payload
	}
	
	let mon = results.value
	let baseStamina = mon.stats.baseStamina + 15
	let baseAttack = mon.stats.baseAttack + 15
	let baseDefense = mon.stats.baseDefense + 15

	let perfect = Math.floor(baseAttack * Math.pow(baseDefense, 0.5) * Math.pow(baseStamina, 0.5) * Math.pow(cpMultiplier[20 -1], 2) / 10)
	let perfect_boosted = Math.floor(baseAttack * Math.pow(baseDefense, 0.5) * Math.pow(baseStamina, 0.5) * Math.pow(cpMultiplier[25 -1], 2) / 10)
	let perfect_maxed = Math.floor(baseAttack * Math.pow(baseDefense, 0.5) * Math.pow(baseStamina, 0.5) * Math.pow(cpMultiplier[40 -1], 2) / 10)

	payload.value.perfect = perfect
	payload.value.perfect_boosted = perfect_boosted
	payload.value.perfect_maxed = perfect_maxed

	return payload

}
