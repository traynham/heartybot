const {colors, privacy} = require('@config').discord
const {me} = require('@core')


module.exports = ({embed, member, value}) => {

	let hidden = member.privacy ? member.privacy.split(',') : []
	//let shown = privacy


	// NO VALUE OR BAD VALUE 
	if(!value || !privacy.includes(value)){
		embed.setColor(colors.error)
		embed.setDescription(`<@${member.snowflake}>, the **hide** action requires a valid value.`)
		embed.addField('Syntax', '`!me hide [value]`\n\u200B')
		embed.addField('Example', '`!me hide team`\n\u200B')
		embed.addField('Possible Values', privacy.join(', '))
		return true
	}


	// HIDE VALUE
	if(!hidden.includes(value)){
	
		hidden.push(value.toLowerCase())
		me.set(member.id, {privacy: hidden.join(',')})
		
		embed.setColor(colors.success)
		embed.setTitle('Success!')
		embed.setDescription(`<@${member.snowflake}>, **"${value}"** is now hidden on your Me card.`)

		return true

	}
	
	// ALREADY HIDDEN
	if(hidden.includes(value)){
	
		embed.setColor(colors.caution)
		embed.setTitle('Already hidden...')
		embed.setDescription(`<@${member.snowflake}>, **"${value}"** was already hidden.`)

	}
	
}