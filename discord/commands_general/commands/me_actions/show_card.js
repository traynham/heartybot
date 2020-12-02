//const {colors} = require('@config').discord
//const {detect, discord, me, qr} = require('@core')

module.exports = async ({embed, member, message}) => {

	let privacy = member.privacy.split(',')
	
	if(!privacy.includes('name')) embed.addField('Name', member.nickname)
	if(!privacy.includes('team')) embed.addField('Team', member.team)
	if(!privacy.includes('level')) embed.addField('Level', member.level)
	if(!privacy.includes('started')) embed.addField('Started', member.started)
	if(!privacy.includes('code') && member.trainer_code) embed.addField('Friend Code', member.trainer_code)
	embed.setThumbnail(message.author.displayAvatarURL())

}