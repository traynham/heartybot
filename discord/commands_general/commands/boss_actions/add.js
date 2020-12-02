const {colors, prefix} = require('@config').discord
const {detect, pokedex, util} = require(`@core`)

const lowdb_bosses = require('@models_lowdb/bosses.js')

module.exports = ({embed, args, message}) => {

	// DETECT TIER
	let detect_tier = detect.boss_tier(args)

	// IF NO VALID TIER			
	if(detect_tier.error){
		embed.setColor(colors.error)
		embed.setDescription(`Could not find a valid tier in "${args.join(' ')}".\nSyntax: ${prefix}boss add <pokemon> <tier>`)
		message.channel.send(embed)
		return
	}
		
	// DETECT POKEMON
	//let detect_pokemon = pokedex.get(detect_tier.mod)
	let detect_pokemon = pokedex.find(detect_tier.mod)
	
	// IF POKEMON FOUND
	if(detect_pokemon.value){				
		lowdb_bosses.add(detect_tier.value, detect_pokemon.value)
		embed.setColor(colors.success)
		embed.setDescription(`"${util.titleCase(detect_pokemon.value.name)}" was added to bosses.`)
		message.channel.send(embed)
		return
	}

	// IF NO POKEMON FOUND
	//if(detect_pokemon.found.length == 0){
	if(detect_pokemon.error){
		embed.setColor(colors.error)
		embed.setDescription(`Could not find Pokémon using the term "${detect_tier.mod} = ${args}".`)
		message.channel.send(embed)
		return
	}

	// IF TO MANY POKEMON FOUND
	//if(detect_pokemon.found.length > 1){
	if(detect_pokemon.count > 1){
		let theMons = detect_pokemon.found.map(pokemon => pokemon.name)
		embed.setColor(colors.error)
		embed.setDescription(`To many Pokémon found found. (${util.titleCase(theMons.join(', '))})`)
		message.channel.send(embed)
		return
	}

}