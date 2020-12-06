const cheerio = require('cheerio')
const fetch = require('node-fetch')

const lowdb_bosses = require('@models_lowdb/bosses.js')

module.exports = async () => {

	//const {detect, pokedex, util} = require(`@core`)
	const {pokedex} = require(`@core`)

	let result = {
		date: new Date(),
		raw: [],
		tiers_obj: {},
		tiers: [],
		trie: []
	}

	let data = await fetch('https://leekduck.com/boss/').then(res => res.text())
	
	const $ = cheerio.load(data)
	
	let current = ''
	
	$('#raid-list ul.list').children().each(function(i, elem) {
	
		if($(this).attr('class') == 'header-li') {
			let level = $(this).find('h2').text()
			if(current != level ) current = level
			result.tiers_obj[current] = []
		}
	
		if($(this).attr('class') == 'boss-item') {
			let boss = $(this).find('.boss-1 p').text()
			result.tiers_obj[current].push(boss)
			result.raw.push(boss)
		}

	})
	
	Object.keys(result.tiers_obj).forEach( tier => 
		result.tiers.push({name: tier, value: result.tiers_obj[tier]})
	)

	// SORT / BUILD TRIE OBJECT
	Object.keys(result.tiers_obj).forEach(function(tier){

		result.tiers_obj[tier].sort()
			
		result.tiers_obj[tier].forEach(function(mon){

			let detect_pokemon = pokedex.find(mon)			
			let asset = ''

			try {
				//asset = detect_pokemon.value[0].icon
				asset = detect_pokemon.value.icon
			} catch (error){
				console.error(`Could not find icon for ${mon}`)
				// SET ASSET TO GENRIC POKEMON???????
			}

			result.trie.push({
				name: mon,
				value: mon,
				tier: tier,
				asset: asset
			})
		})
		
	})
		
	result.raw.sort()
	
	lowdb_bosses.assign(result)

}