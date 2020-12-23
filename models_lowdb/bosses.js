/**
 * LowDB model for Bosses.json
 *
 * ## History:
 * - 09-23-20 Birth!
 *
 * -----
 * @module Bosses
 * @author Jesse Traynham
 * @category LowDB
 *
 * @todo Figure out what needs to be done with db.defaults.
 * @todo Create global def for pokemon object.
 * @toto Use payload object
 **/

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

//const payload_obj = require('../core/util/payload')

const adapter = new FileSync('./data/cache/pokemongo/bosses.json')
const db = low(adapter)

/* WILL I NEED THIS? */
db.defaults({
	date: new Date(),
	raw: [],
	tiers_obj: {},
	tiers: [],
	trie: []
}).write()


module.exports = {
	
	/**
	 * Return full boss object.
	 * @returns {object}
	 * @todo rename to list?
	 */
	bosses: () => {
		return db.value()
	},
	
	/**
	 * Set full boss object.
	 */
	assign: (obj) => {
		db.assign(obj).write()
	},
	
	// Level, Pokemon Record
	/**
	 * Add a Pokémon to the boss list.
	 * @param {string} level The raid level for the boss.
	 * @param {pokemon} pokemon The Pokémon object
	 * @todo ADD PAYLOAD STUFF
	 * @todo Use global pokemon type.
	 */
	add: (level, pokemon) => {

		const titleCase = require('../core/util/titlecase')

		let name = titleCase(pokemon.name)

		// ADD TO "RAW"
		if(!db.get('raw').value().includes(name)){
			db.get('raw').push(name).write()
		}
		
		// ADD TO "TIERS_OBJ"
		if(!db.get(`tiers_obj.${level}`).value().includes(name)){
			db.get(`tiers_obj.${level}`).push(name).write()
		}
		
		// ADD TO "TIERS"
		if(!db.get('tiers').find({name: level}).get('value').value().includes(name)){
			db.get('tiers').find({name: level}).get('value').push(name).write()
		}
		
		// ADD TO "TRIE"
		if(!db.get('trie').find({name: name}).value()){
			db.get('trie').push({
				"name": name,
				"value": name,
				"tier": level,
				"asset": pokemon.icon
			}).write()
		}
		
	},
	
	/**
	 * Remove a Pokémon from the boss list.
	 * @param {string} pokemon The name of the Pokémon.
	 * @todo ADD PAYLOAD STUFF
	 */
	remove: (pokemon) => {

		const titleCase = require('../core/util/titlecase')
		
		let name = titleCase(pokemon)
		
		// REMOVE FROM "RAW"
		db.get('raw').pull(name).write()
		
		// REMOVE FROM "TIERS_OBJ"
		Object.keys(db.get('tiers_obj').value()).forEach(key => {
			db.get(`tiers_obj.${key}`).pull(name).write()
		})
		
		// REMOVE FROM "TIERS"
		db.get('tiers').value().forEach(tier => {
			db.get('tiers').find({name: tier.name}).get('value').pull(name).write()
		})
		
		// REMOVE FROM "TRIE"
		db.get('trie').remove(boss => boss.name == name).write()

	}

} //MODULE.EXPORTS

