const {colors} = require('@config').discord
const {detect, discord, me, qr} = require('@core')

module.exports = async ({embed, member, value, message}) => {

	// IF EDIT
	if(value){
	
		let detectCode = detect.code(value)
		let code = detectCode.value

		// IF BAD CODE
		if(detectCode.error){
			
			embed.setColor(colors.error)
			embed.setDescription(`<@${member.snowflake}>, I could not detect a valid trainer code.`)
			embed.addField('Error', detectCode.error_message)

			return true

		}
		
		// IF GOOD CODE
		let update = await me.set(member.id, {
			trainer_code: detectCode.value_formatted
		})
		
		if(update){

			embed.setColor(colors.success)
			embed.setDescription(`<@${member.snowflake}> your code was set.`)
			embed.addField('Code', code)

		}
		
		return true

	}


	// IF CODE NOT SET
	if(!member.trainer_code){
		
		embed.setColor(colors.caution)
		embed.setDescription(`<@${member.snowflake}> your code has not set.`)
	
		return true

	}


	// IF SHOW FULL CODE CARD
			
	embed.setColor(colors.code)

	let qrcode_value = member.trainer_code.replace(/ /g, '')

	let trainer_qr = await qr.create({
		name: `${qrcode_value}.png`,
		value: qrcode_value,
	})
	
	//let content = member.trainer_code
	embed.setAuthor(message.author.username, message.author.displayAvatarURL())

	discord.setImage(embed, trainer_qr.path, trainer_qr.name)

	embed.addField("Here's my friend code:", member.trainer_code)

	embed.setFooter('Note: long press on mobile to copy code as text.')
	

}




// TODO:

// FIND CACHED USER. MUST MATCH EXACT NAME. :(
	/*
	console.log(
		message.client.users.cache.find(user => user.username.toLowerCase() === 'mrsjessman')
	)
	*/
