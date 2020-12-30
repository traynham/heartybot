/**
 * @module Gyms
 * @author Jesse Traynham
 * @category Discord Commands
 * @subcategory General
 */

/**
 * @param {object} message Discord message
 * @param {array} argv Arguments array from yargs.
 * @function
 * @name gyms
 */
 
const Discord = require('discord.js');
const {gyms: gyms_core, help} = require('@core')
const {domain} = require(`@config`)
const {colors, emoji} = require(`@config`).discord

module.exports = {
	name: 'gyms',
	meta: help.get('commands_general', 'gyms').value,
	cooldown: 5,
	async execute(message, argv) {

		let args = argv._

		// EMPTY ARGS
		if(args.length == 0){
			message.channel.send('Whoops. Enter a search to find a gym. Use `?gyms` for help.')
			return
		}

		let response = await gyms_core.find(args)

		// FOUND NONE
		if(response.rows.length == 0){
			// send help card.
			message.channel.send('No gyms were found. Use `?gyms` for help.')
			return
		}

		let gym = response.gym
		let gyms = []

		response.rows.forEach(function(element, index) {
			if(index < 10) {
				gyms.push(`${index + 1}. [${element.name}](${domain}/gyms/${element.gymid}) (${element.gymid.toUpperCase()})`)
			}
		})
		gyms.push(`${emoji.spacer}`)

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)

		// One Gym
		if(response.rows.length == 1) {
	
			const attachment = new Discord
				.MessageAttachment(`./public/images/gyms/${gym.gymid}.jpeg`, `${gym.gymid}.jpeg`);
	
			embed.title = `**${gym.name}**`
			embed.url = `${domain}/Gyms/${response.gym.gymid}`
			embed.attachFiles(attachment)
			embed.setThumbnail(`attachment://${gym.gymid}.jpeg`);

			embed.addField(
				`**Address/Directions:**`,
				`[${gym.address}](https://www.google.com/maps/search/${encodeURIComponent(gym.coordinates)} 'Get Directions')`
			)

		} // IF ONE GYM


		// Many Gyms
		if(response.rows.length > 1 && !['by', 'in'].includes(response.method)) {

			embed.title = `**Search for "${response.q}"**`
			embed.url = `${domain}/Gyms/${response.q}`

			if(response.rows.length <= 10) {
				embed.addField(`Found ${response.rows.length} gyms matching "${response.q}"...`, gyms, true)
			} else {
				embed.addField(`**Showing 10 of ${response.rows.length} gyms:**`, gyms, false)
				embed.addField(`**More:**`, `[See more on heartyjessman.com](${domain}/Gyms/${response.q})`)
			}

		}

		// BY GYM
		if(response.method == 'by') {

			if(response.gym) {
				embed.title = `** ${response.gym.name}**`
				embed.url = `${domain}/Gyms/${response.gym.gymid}`
				embed.setThumbnail(`http://heartyjessman.com/images/gyms_by_id/${gym.gymid}.jpeg`)
				embed.addField(
					`**Address/Directions:**`,
					`[${gym.address}](https://www.google.com/maps/search/${encodeURIComponent(gym.coordinates)} 'Get Directions')\n${emoji.spacer}`
				)

			} else {
				embed.title = `**Gyms near "${response.q}"**`
				embed.url = `${domain}/Gyms/${response.q}`
			}

			embed.addField('**Nearby Gyms**', gyms, true)		

		} // BY GYM

		// IN AREA
		if(response.method == 'in') {

			embed.title = `**${gym.area} Gyms (${response.rows.length})**`
			embed.url = `${domain}/Gyms/${gym.area_encoded}`

			embed.setThumbnail(`${domain}/images/icons/gym.png`)
		
			if(response.rows.length <= 10) {
				embed.addField(`Found ${response.rows.length} gyms:`, gyms, false)
			} else {
				embed.addField(`Showing 10 of ${response.rows.length} gyms:`, gyms, false)
				embed.addField(`**More:**`, `[See more on heartyjessman.com](${domain}/Gyms/${gym.area_encoded})`)
			}

		}

		message.channel.send(embed);

	} // EXECUTE

} // MODULE.EXPORTS