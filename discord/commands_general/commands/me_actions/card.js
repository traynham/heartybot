const dateFormat = require('dateformat')

module.exports = async ({embed, member, message}) => {

// INCLUDE LOGIC FOR WHEN FIELDS ARE EMPTY...

	let privacy = member.privacy ? member.privacy.split(',') : []
	
	if(!privacy.includes('name')) embed.addField('Name', member.nickname)
	if(!privacy.includes('team')) embed.addField('Team', member.team)
	if(!privacy.includes('level')) embed.addField('Level', member.level)
	if(!privacy.includes('started')) embed.addField('Started', dateFormat(member.started, "m/dd/yy"))
	if(!privacy.includes('code') && member.trainer_code) embed.addField('Friend Code', member.trainer_code)
	embed.setThumbnail(message.author.displayAvatarURL())

}