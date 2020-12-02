const lowdb_bosses = require('@models_lowdb/bosses.js')
const {detect} = require(`@core`)

const {colors} = require('@config').discord

module.exports = async ({embed, args, message}) => {

	let detect_boss = detect.boss(args)
	
	// ISSUE FINDING BOSS
	if(!detect_boss.value){
		embed.setColor(colors.error)
		embed.setDescription(`"${args.join(' ')}" does not appear to be a boss.`)
		message.channel.send(embed)
		return
	}

	// BOSS REMOVED
	if(detect_boss.count == 1){
		lowdb_bosses.remove(detect_boss.value)
		embed.setColor(colors.success)
		embed.setDescription(`"${detect_boss.value}" was removed from bosses.`)
		message.channel.send(embed)
		return
	}
	
	// TO MANY BOSSES FOUND
	if(detect_boss.count > 1){
		embed.setColor(colors.error)
		embed.setDescription(`To many bosses found. (${detect_boss.value.join(', ')})`)
		message.channel.send(embed)
	}


}