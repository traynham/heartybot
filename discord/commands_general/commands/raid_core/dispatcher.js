const {add, sub} = require('date-fns')
const Discord = require('discord.js');
const {colors, raid_duration_boss} = require(`@config`).discord
const bosses = require('@models_lowdb/bosses.js').bosses()
const guilds = require('@data/private/guilds.json')

module.exports = (payload) => {
	
	const lowdb_raids = require('@models_lowdb/raids.js')
	const {detect, discord} = require(`@core`)
	const gather = require('./gather')

	// MISSING BOSS
	if(!payload.pokemon){

		const bosses_list = bosses.tiers.map(tier => {
			return `**${tier.name}:** ${tier.value.join(', ')}`
		})

		gather({
			title: 'Which Boss?',
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
			title: 'What Time/Duration?',
			description: 'Enter a time and submit.',
			payload: payload
		}, function(time){
			payload.time = discord.parseRaid.extract_time({value: time})
			if(!payload.time){ payload.time = discord.parseRaid.extract_duration({value: time}) }
			console.log('GATHER TIME::', payload.time)
			console.log('GATHER MON::', payload.pokemon.value)
			console.log('GATEHER IS TIER?::', payload.pokemon.type)
			console.log('GATEHER IS TIER?::', payload.pokemon.type === 'tier')
		})

		return true
	}
	
	// MISSING GYM
	if(!payload.gym){

		gather({
			title: 'What Gym?',
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
	
	let isEgg = detect.isEgg(payload.pokemon.value).value

	if(isEgg){
		payload.time.value = add(payload.time.value, {minutes: raid_duration_boss})
	}

	// ADD RAID
	let raids_add = lowdb_raids.raids_add({
		asset: payload.pokemon.asset,
		author: payload.message.author,
		boss: payload.pokemon.value,
		hatches: sub(payload.time.value, {minutes: raid_duration_boss}),
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

	// OPEN CHANNEL
	payload.message.guild.channels.create('_' + payload.gym.gym.name, {
		topic: 'This is the topic',
		parent: payload.message.channel.parent
	}).then( async (channel) => {

		// UPDATE RAID WITH CHANNEL ID.
		await lowdb_raids.raids_update(payload.gym.gym.name,'channel', channel.id)

		// POST RAID EMBED TO NEW CHANNEL
		discord.embedRaid(channel.id, {message: payload.message, new: true})
		
		// POST RAID EMBED TO GUILD'S RAID CHANNEL
		let guild = guilds.find(guild => guild.id = payload.message.guild.id)
		
		let raid_channel = guild.channels.find(channel => {
			if(channel.type == 'raid') { return true}
		})

		discord.embedRaid(channel.id, {message: payload.message, raid_channel: raid_channel.id})

	}).catch(error => { console.log('ERROR CREATING RAID CHANNEL:', error)})

}