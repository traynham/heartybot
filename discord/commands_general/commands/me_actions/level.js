const {colors} = require('@config').discord
const {detect, me} = require('@core')

module.exports = async ({embed, member, value}) => {

	// IF EDIT
	if(value){
	
		let level = detect.level(value)

		// IF BAD LEVEL VALUE		
		if(level.error){

			embed.setColor(colors.error)
			embed.title = 'Error setting level'				
			embed.setDescription(`<@${member.snowflake}> , ${level.error_message}`)
			
			return true
		
		}	
				
		let update = await me.set(member.id, {level: level.value})
		
		if(update){
			embed.setColor(colors.success)
			embed.setDescription(`<@${member.snowflake}> your level was set.`)
			embed.addField('Level', level.value)
		}
		
		return true
				
	} // IF EDIT

	// IF SHOW LEVEL
	embed.setDescription(`<@${member.snowflake}> , your level is...`)
	embed.addField('Level', member.level)

}