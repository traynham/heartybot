/**
 * Update a Discord Embed object with Pokémon properties.
 *
 * **Note:** This function mutates the embed.
 *
 * -----
 * @module Embed Pokémon
 * @author Jesse Traynham
 * @category Core
 * @subcategory Discord
 */

/**
 * @param {object} embed A discord message embed object.
 * @param {string} q The egg or Pokémon. **Note:** Uses pokedex.find(q) so q needs to be exact Pokémon name.
 * @param {array} [show = ['charge', 'fast', 'perfect', 'type']] An array of section types to show on the embed card.
 * @function
 * @name embedPokemon
 * @todo Use payload and do error checking. Currently it errors out if pokemon is not found. Whoops. pokedex command needs to take into account the returned errors.
 * @todo Clean up code.
 */


module.exports = (embed, q, show = ['charge', 'fast', 'perfect', 'type']) => {

	if(!show) show = ['charge', 'fast', 'perfect', 'type'] // Show breaks without?

	const {pokedex, util} = require(`@core`)
	const {emoji} = require(`@config`).discord
	const eggs = require(`@data/pokemongo/eggs`)
	const bosses = require('@models_lowdb/bosses.js').bosses()
	const payload_obj = require('@core/util/payload')

	let payload = payload_obj()

	// IF EGG/TIER
	if(Object.keys(eggs).includes(String(q).toLowerCase()) ){
		let egg = eggs[q.toLowerCase()]
		let tier_bosses = bosses.tiers.find(tier => tier.name.toLowerCase() == q.toLowerCase())
		embed.setTitle(egg.name)
		embed.setThumbnail(`https://images.weserv.nl/?w=100&fit=contain&url=${egg.asset}`)
		embed.addField('**Possible Bosses:**', tier_bosses.value)
		payload.value = tier_bosses.value
		return payload
	}
	
	let pokemon = pokedex.find(q)

	if(pokemon.error) {
		payload.error = true
		payload.error_message = pokemon.error_message
		return payload
	}
	
	let mon = pokemon.value
	
	let type1 = mon.type.replace(/POKEMON_TYPE_/g, '')
	let type2 = mon.type2 ? mon.type2.replace(/POKEMON_TYPE_/g, '') : ''
	
	let type1_meta = pokedex.type(type1)
	let type2_meta =  pokedex.type(type2)

	let type1_weak = []
	let type1_strong = []
	let type2_weak = []
	let type2_strong = []
		
	//if(!type1_meta.error) {
		type1_weak = type1_meta.value.weak.map( (type) => emoji[type] )		
		type1_strong = type1_meta.value.strong.map( (type) => emoji[type] )
	//}
	
	if(!type2_meta.error) {
		type2_weak = type2_meta.value.weak.map( (type) => emoji[type] )
		type2_strong = type2_meta.value.strong.map( (type) => emoji[type] )
	}

	embed.setColor(type1_meta.value.color)	

	let title = type1_meta.value.emoji
	if(!type2_meta.error) title += ' ' + type2_meta.value.emoji

	embed.setTitle('**' + mon.name + emoji.blank + title + '**')
	embed.setThumbnail(`https://images.weserv.nl/?w=100&fit=contain&url=${mon.icon}`)

	if(show.includes('fast')){
		embed.addField(
			'**Fast Moves**',
			emoji.blank + util.titleCase(mon.quickMoves.join(', ').replace(/_FAST/g, '')) + '\n\u200B'
		)
	}

	if(show.includes('charge')){
		embed.addField(
			'**Charge Moves**',
			emoji.blank + util.titleCase(mon.cinematicMoves.join(', ')) + '\n\u200B'
		)
	}
	
	if(show.includes('type')){
		//if(!type1_meta.error) {
			embed.addField(
				`**Type (${type1})**`,
				'\n\u200B\n' + emoji.blank + type1_weak.join(' ') + '\n\u200B\n' + 
				emoji.blank + type1_strong.join(' ') + '\n\u200B\n'
			)
		//}			
		if(!type2_meta.error) {
			embed.addField(
				`**Type (${type2})**`,
				'\n\u200B\n' + emoji.blank + type2_weak.join(' ') + '\n\u200B\n' + 
				emoji.blank + type2_strong.join(' ')
			)		
		}
	} // SHOW Type
	
	if(show.includes('perfect')){
		let perfects = pokedex.perfect(mon.name, 20)
		embed.addField(
			'**Perfect**',
			`${emoji.blank}${perfects.value.perfect}\n${emoji.blank}${perfects.value.perfect_boosted} (Boosted)\n${emoji.blank}${perfects.value.perfect_maxed} (Maxed)\n\u200B\n`
		)
	} // SHOW PERFECT

// THIS NEEDS TO BE FIXED. I NEED TO USE THE PAYLOAD OBJECT.

	payload.value = 'Embed updated'
	return payload

} // EXPORTS