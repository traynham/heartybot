const dateFormat = require('dateformat')
const {colors} = require('@config').discord
const {me} = require('@core')

module.exports = async ({embed, member, value}) => {

	if(value){

		const started = new Date(value)

		let update = await me.set(member.id, {started: started})

		if(update){
			embed.setColor(colors.success)
			embed.setDescription(`<@${member.snowflake}> your start date was set.`)
			embed.addField('Started', dateFormat(started, "m/dd/yy"))
		}

		return true

	}

	embed.addField('Started', dateFormat(member.started, "m/dd/yy"))

}