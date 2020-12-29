/**
 * @module Code
 * @author Jesse Traynham
 * @category Discord Commands
 * @subcategory General
 */

/**
 * @param {object} message Discord message
 * @param {array} argv Arguments array from yargs.
 * @function
 * @name code
 */

const Discord = require('discord.js');

const {detect, help, me, qr} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = {
	name: 'code',
	meta: help.get('commands_general', 'code').value,
	cooldown: 5,
	async execute(message, argv) {
	

		let args = argv._
		
		// SEE IF ARGS IS A CODE
		let detectCode = detect.code(args)
		let code = !detectCode.error ? detectCode.value_formatted : null

		let content = null
		let description = null

		// SET USER TO FIRST MENTION OR THE AUTHOR RESPECTIVELY.
		let user = message.mentions.users.first() || message.author 

		// GRAB MEMBER RECORD FROM DB.
		let member = await me.find(user.id)
		
		// TRY TO FIND MEMBER BY THEIR CODE			
		if(code) member = await me.find({trainer_code: detectCode.value})
		
		// MESSAGE AUTHOR ID AND USER ID ARE THE SAME?
		let isOwner = user.id === message.author.id

		// CREATE EMBED
		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.code)

		if(member){

			let hide_code = member.privacy.split(',').includes('code')
			// HONOR HIDE_CODE, BUT ALLOW OWNER TO POST CODE.
			if(hide_code && !isOwner){
				description = `Sorry, <@${user.id}>'s code is set to private.`
			}
			
			// ISOWNER AND NO CODE SET
			else if(!member.trainer_code && isOwner && !detectCode.error){
				description = `Sorry, <@${user.id}>, you have not set your code yet. See help for more information.`
			}
			
			// NO CODE SET
			else if(!member.trainer_code && !detectCode.error){
				description = `Sorry, ${user.username} has not set their code.`
			}
	
			// POST CARD.
			else if(member.trainer_code){

				if(code){
					embed.setAuthor(`${member.nickname}'s trainer code`)
				} else {
					embed.setAuthor(`${member.trainer_name}'s trainer code`, user.displayAvatarURL())
				}
				embed.addField("Here's my friend code:", member.trainer_code)
				detectCode = detect.code(member.trainer_code)
				code = detectCode.value
			}
	
		}

		// ADD DESCRIPTION IF NEEDED
		if(description) embed.setDescription(description)

		if(code){

			let trainer_qr = await qr.create({
				name: `${detectCode.value}.png`,
				value: detectCode.value,
			})

			const attachment = new Discord.MessageAttachment(trainer_qr.path, trainer_qr.name);

			embed.attachFiles(attachment)
			embed.setImage(`attachment://${trainer_qr.name}`);
			embed.setFooter('Note: long press on mobile to copy code as text.')
			
			content = detectCode.value_formatted
		
		} // IF CODE

		// SEND MESSAGE
		message.channel.send(content, embed);

	} // EXECUTE

} // MODULE.EXPORTS