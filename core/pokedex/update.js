/*
	TODO:
	* Clean up and refactor and then clean up again.
	* BACKUP the pgm.json file so they can be DIFFed easily.	
*/

const fetch = require('node-fetch')
const TrieSearch = require('trie-search')



module.exports = async () => {
	
	const {util} = require(`@core`)
	
	console.log('attempting to update pgm')

	let pgm = await fetch('https://raw.githubusercontent.com/PokeMiners/game_masters/master/latest/latest.json').then(res =>  res.json())
	
	console.log('done downloading')
	
	util.file.createFile('/data/pokemongo/pgm.json', pgm)
	
	console.log('done saving pgm2')


	var pokeTrie = new TrieSearch('templateId')
	pokeTrie.addAll(pgm)

	var out = []


//	let records = pokeTrie.get('V0')
	
	// NO NEED TO USE POKETRIE, JUST USE ARRAY.FILTER
	let records = pgm.filter(item => item.templateId.startsWith('V0'))


	records.forEach(function(record) {

	
		let [id, type, pokemon, form, meta] = record.templateId.split('_')
	
			if(type == 'POKEMON'){
			
				let data = record.data.pokemonSettings || {}
			
				let name = pokemon
				if(form) name += ` ${form}`
				if(meta) name += ` ${meta}`
				
				data.name = name
				
				let forms_key = `FORMS_${id}_POKEMON_${pokemon}`
				
				// THIS SHOULD PROBABLY JUST BE TURNED INTO AN ARRAY FILTER.
				let forms = pokeTrie.get(forms_key)[0]
		
				let pokemon_forms = forms.data.formSettings.forms
				data.id = id.split('V0').join('')
				data.assetBundleValue = '00'
		
		
				if(pokemon_forms){
					let form = pokemon_forms.filter(word => word.form == data.form)[0]
					if(form && form.assetBundleValue) data.assetBundleValue = form.assetBundleValue
				}
				
				
				data.icon = `raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/pokemon_icon_${data.id}_${data.assetBundleValue}.png`
		
				out.push(data)


				// IF MEGA
		
				if(data.tempEvoOverrides && data.form == `${pokemon}_NORMAL`){

					data.tempEvoOverrides.forEach(function(evol) {
					
						let mega = {...data}

						mega.name = `${pokemon}${evol.tempEvoId.replace(/TEMP_EVOLUTION/, '').replace(/_/g, ' ')}`
						mega.type = evol.typeOverride1.replace(/POKEMON_TYPE_/, '')
						mega.type2 = evol.typeOverride1.replace(/POKEMON_TYPE_/, '')
						
						mega.stats = evol.stats
						
						mega.camera = evol.camera
						mega.modelScaleV2 = evol.modelScaleV2
						mega.modelHeight = evol.modelHeight
						
						let mega_info = pokeTrie.get(`TEMPORARY_EVOLUTION_${id}_POKEMON_${pokemon}`)[0]

						mega_info.data.temporaryEvolutionSettings.temporaryEvolutions.forEach(function(info) {
		
							if(evol.TemporaryEvolution == info.TemporaryEvolution){
						
								mega.assetBundleValue = info.assetBundleValue
						
								mega.icon = `raw.githubusercontent.com/PokeMiners/pogo_assets/master/Images/Pokemon/pokemon_icon_${mega.id}_${mega.assetBundleValue}.png`
							}
						})
					
						out.push(mega)
						
						console.log(mega)
					
					})
				
				}
		
			} // IF POKEMON
		
		}) // FOR EACH

		util.file.createFile('/data/pokemongo/pokedex.json', out)

}