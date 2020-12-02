const {colors} = require('@config').discord
const {util} = require(`@core`)

//module.exports = ({embed, args, message}) => {
module.exports = ({embed, message}) => {

	// NEEDS ERROR CHECKING!!!
	
	let boss_update = util.update_bosses()
	
	embed.setColor(colors.success)
	embed.setDescription('Yay. Bosses were updated.')
	message.channel.send(embed)

}