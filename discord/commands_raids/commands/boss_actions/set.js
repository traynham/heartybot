const {colors} = require('@config').discord
const {detect, discord, util} = require(`@core`)

//const lowdb_bosses = require('@models_lowdb/bosses.js')
const lowdb_raids = require('@models_lowdb/raids.js')

const tiers_data = require('@data/pokemongo/eggs.json')

module.exports = ({embed, args, message}) => {

	// THIS PROBABLY NEEDS TO BE A PARAM
	//let raid = lowdb_raids.findRaid(message.channel.id)
	let raid = lowdb_raids.raids_find(message.channel.id)

	// DETECT TIER
	let detectTier = detect.boss_tier(args)
	
	if(detectTier.value) {
		
		//lowdb_raids.updateRaid(raid.channel, 'boss', detectTier.value)
		//lowdb_raids.updateRaid(raid.channel, 'asset', detectTier.asset)
		lowdb_raids.raids_update(raid.channel, 'boss', detectTier.value)
		lowdb_raids.raids_update(raid.channel, 'asset', detectTier.asset)
		
		discord.embedPokemon(embed, detectTier.value)
		
		let asset = tiers_data[detectTier.value.toLowerCase()].asset
		embed.setTitle('**RAID BOSS UPDATED: **')
		embed.setDescription(`Boss set to ${detectTier.value} egg.`)
		embed.setThumbnail(`https://${asset}`)
		message.channel.send(embed)
		
		return
	}

	// SET BOSS
	let detectBoss = detect.boss(args)
	
	// TO MANY BOSSES
	if(detectBoss.count > 1){
		let bosses = util.titleCase(detectBoss.value.join(', '))
		embed.setColor(colors.error)
		embed.setDescription(`To many Pokémon found found. (${bosses})`)
		message.channel.send(embed)
		return
	}
	
	// NO BOSS FOUND
	if(detectBoss.error){
		embed.setColor(colors.error)
		embed.setDescription('Sorry, boss not found.')
		message.channel.send(embed)
		return true
	}

	// FOUND ONE BOSS
	if(detectBoss.count == 1){
		//lowdb_raids.updateRaid(raid.channel, 'boss', detectBoss.value)
		//lowdb_raids.updateRaid(raid.channel, 'asset', detectBoss.asset)
		lowdb_raids.raids_update(raid.channel, 'boss', detectBoss.value)
		lowdb_raids.raids_update(raid.channel, 'asset', detectBoss.asset)	
		discord.embedPokemon(embed, detectBoss.value)
		embed.title = '**BOSS UPDATED: **\n ' + embed.title
		message.channel.send(embed)
		return true
	}

}