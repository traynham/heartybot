const {colors, privacy} = require('@config').discord
const {me} = require('@core')

module.exports = ({embed, member, value}) => {

	let hidden = member.privacy.split(',')
	//let shown = privacy


	// NO VALUE OR BAD VALUE 
	if(!value || !privacy.includes(value)){
		embed.setColor(colors.error)
		embed.setDescription(`<@${member.snowflake}>, the **show** action requires a valid value.`)
		embed.addField('Syntax', '`!me show [value]`\n\u200B')
		embed.addField('Example', '`!me show team`\n\u200B')
		embed.addField('Possible Values', privacy.join(', '))
		return true
	}


	// SHOW VALUE
	if(hidden.includes(value)){

		hidden = hidden.filter(e => e !== value.toLowerCase())
		me.set(member.id, {privacy: hidden.join(',')})

		embed.setColor(colors.success)
		embed.setTitle('Success!')
		embed.setDescription(`<@${member.snowflake}>, **"${value}"** is now showing on your Me card.`)
		
		return true
		
	}

	
	// ALREADY SHOWING
	if(!hidden.includes(value)){

		embed.setColor(colors.caution)
		embed.setTitle('Already showing...')
		embed.setDescription(`<@${member.snowflake}>, **"${value}"** was already showing.`)
		
	}

	
}