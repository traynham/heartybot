const {colors} = require('@config').discord
const {detect, discord, me} = require('@core')

module.exports = async ({embed, member, value, message}) => {

	// IF EDIT
	if(value){
	
		let detectTeam = detect.team(value)
		let team = detectTeam.value

		if(detectTeam.error){
			embed.setColor(colors.error)
			embed.setDescription('Sorry, team not found.')
			return
		}

		let update = await me.set(member.id, {team: team})

		if(update){
			embed.setColor(colors.success)
			embed.setDescription(`<@${member.snowflake}> your team was set.`)
			embed.addField('Team', team)
			discord.setThumbnail(embed, `./public/images/icons/${team}.png`, `${team}.png`)
			discord.setRole(message, team)
		}

		return true

	}

	// IF SHOW TEAM
	embed.addField('Team', member.team)
	discord.setThumbnail(embed, `./public/images/icons/${member.team}.png`, `${member.team}.png`)
	
}