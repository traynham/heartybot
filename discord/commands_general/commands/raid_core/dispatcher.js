const Discord = require('discord.js');
const {colors} = require(`@config`).discord
const bosses = require('@models_lowdb/bosses.js').bosses()

module.exports = (payload) => {
	
	const lowdb_raids = require('@models_lowdb/raids.js')
	const {discord} = require(`@core`)
	const gather = require('./gather')

	// MISSING BOSS
	if(!payload.pokemon){

		const bosses_list = bosses.tiers.map(tier => {
			return `**${tier.name}:** ${tier.value.join(', ')}`
		})

		gather({
			title: 'Boss',
			description: `Enter a boss name and submit.\n\n${bosses_list.join('\n\n')}`,
			payload: payload
		}, function(term){
			payload.pokemon = discord.parseRaid.extract_boss({value: term})		// TRY BOSS
		})

		return true
	}
	
	// TO MANY BOSSES
	if(Array.isArray(payload.pokemon.value)){

		let values = payload.pokemon.value.map((value, i) => `${i + 1}. ${value}` )

		gather({
			title: 'To many **bosses** detected.',
			description: `I detected to many bosses. Which one did you mean? **Enter a number** and submit. \n\n${values.join('\n')}`,
			payload: payload
		}, function(index){
			payload.pokemon.value = payload.pokemon.value[index - 1]
		})

		return true
	}
	
	// MISSING TIME
	if(!payload.time){

		gather({
			title: 'Time/Duration',
			description: 'Enter a time and submit.',
			payload: payload
		}, function(time){
			payload.time = discord.parseRaid.extract_time({value: time})
			if(!payload.time){ payload.time = discord.parseRaid.extract_duration({value: time}) }
		})

		return true
	}
	
	// MISSING GYM
	if(!payload.gym){

		gather({
			title: 'Gym.',
			description: `Enter a search for a gym and submit.`,
			payload: payload
		}, async function(term){
			payload.gym = await discord.parseRaid.extract_gym({value: term})	// TRY GYM
		})
	
		return true
	}

	// TO MANY GYMS
	if(payload.gym.rows.length > 1 && !payload.gym_found){

		let values = payload.gym.rows.map((value, i) => `${i + 1}. ${value.name}` )
	
		gather({
			title: 'To many **gyms** detected.',
			description: `I detected to many gyms. Which one did you mean? Enter a number and submit. \n\n${values.join('\n')}`,
			payload: payload
		}, function(index){
			payload.gym.gym = payload.gym.rows[index - 1]
			payload.gym_found = true
		})

		return true

	}
	
	// check for multiple bosses and gyms.

	// ADD RAID
	let raids_add = lowdb_raids.raids_add({
		asset: payload.pokemon.asset,
		boss: payload.pokemon.value,
		name: payload.gym.gym.name,
		gym: payload.gym.gym,
		time: payload.time.value,
		trainers: []
	})

	// CHECK RAID EXISTENCE
	if (raids_add.error) {
		console.log('raid already exists, create embed response')
		
		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		
		payload.message.channel.send(embed)
		return true
	}

console.log('PUT EMBED CODE HERE')





	// OPEN CHANNEL
	payload.message.guild.channels.create('_' + payload.gym.gym.name, {
		topic: 'This is the topic',
		parent: payload.message.channel.parent
	}).then( async (channel) => {

		let setRaidChannel = await lowdb_raids.raids_update(payload.gym.gym.name,'channel', channel.id)

		console.log(setRaidChannel)
		
console.log('PUT CHANNEL EMBEDS HERE')

	
		discord.embedRaid(channel.id, {message: payload.message, new: true})
		
		// CREATE MESSAGE WITH COMPLETE INFO AND POST.

	}).catch(error => { console.log('ERROR CREATING RAID CHANNEL:', error)})

}