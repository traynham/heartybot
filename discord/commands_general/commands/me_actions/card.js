const dateFormat = require('dateformat')

module.exports = async ({embed, member, message}) => {

	let privacy = member.privacy ? member.privacy.split(',') : []
	
	// NAME
	if(!privacy.includes('name')) embed.addField('Name', member.nickname)
	
	// TEAM
	if(!privacy.includes('team')) {
		embed.addField('Team', member.team ? member.team : '-')
	}
	
	// LEVEL
	if(!privacy.includes('level')) {
		embed.addField('Level', member.level ? member.level : '-' )
	}
	
	if(!privacy.includes('started') && member.started != 'Invalid Date') {
		embed.addField(
			'Started',
			member.started ? dateFormat(member.started, "m/dd/yy") : '-'
			)
	}
	
	// CODE
	//if(!privacy.includes('code') && member.trainer_code) {
	if(!privacy.includes('code')) {
		embed.addField('Friend Code', member.trainer_code ? member.trainer_code : '-')
	}
	
	// AVATAR THUMBNAIL
	embed.setThumbnail(message.author.displayAvatarURL())

}