const {detect, discord} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = ({embed, args, message}) => {

	let filter = null

	if(['charge', 'fast', 'perfect', 'type'].includes(args[0])){
		filter = args[0]
		args.shift()
	}

	// DETECT BOSS
	let detectBoss = detect.boss(args)

	if(detectBoss.error){
		embed.setColor(colors.error)
		embed.setTitle('Boss Error')
		embed.addField('Error', detectBoss.error_message)
		message.channel.send(embed)
		return
	}

	embed.setTitle(detectBoss.value)

	discord.embedPokemon(embed, detectBoss.value, filter)
	
	message.channel.send(embed)
	return

}