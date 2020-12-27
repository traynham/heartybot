const {detect, discord} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = ({embed, args, message}) => {

	let filter = null
	
	let filters = [
		{name: 'charge', aliases: ['cha', 'chrg']},
		{name: 'fast', aliases: ['fas', 'fst']},
		{name: 'perfect', aliases: ['per', 100]},
		{name: 'type', aliases: ['typ', 'tp']},
	]
	
	// FIND OPTIONAL FILTER AND REMOVE FROM ARGS.
	for (let step = 0; step < args.length; step++) {

		let arg = args[step]
		
		filter = (
			filters.find(filter => filter.name == arg) || 
			filters.find(filter => filter.aliases && filter.aliases.includes(arg)) ||
			{name: null}
		).name
		
		if(filter){
			args = args.filter(item => item !== arg)
			break
		}
	}

	// DETECT BOSS
	let detectBoss = detect.boss(args)

	if(detectBoss.error){
		console.log(detectBoss)
		embed.setColor(colors.error)
		embed.setTitle('Boss Error')
		embed.addField('Error', detectBoss.error_message)
		embed.addField('Found', detectBoss.value)
		message.channel.send(embed)
		return
	}

	embed.setTitle(detectBoss.value)

	discord.embedPokemon(embed, detectBoss.value, filter)
	
	message.channel.send(embed)
	return

}