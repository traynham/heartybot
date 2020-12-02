const Discord = require('discord.js');
const {gyms} = require('@core')
const {domain} = require(`@config`)

module.exports = {
	name: 'gyms',
	aliases: ['g', 'gym'],
	description: 'View information about gyms',
	cooldown: 5,
//	execute(message, args) {
	async execute(message, argv) {

/**
	TODO
	* Add spacing and bold stuff so cards will look better on mobile.
	* Return message when there is no q. Currently, it's erroring in gyms.find()
	
**/
	
//		(async () => {
		//console.log('DOMAIN', domain)
			let args = argv._
			
			//let request = {
			//	args: args
			//}

			//let response = await gyms.find(request)
			let response = await gyms.find(args)
			
			//console.log(response)

			if(response.rows.length == 0){
				// send help card.
				message.channel.send('No gyms were found.')
			} else {

				let gym = response.gym
				let gyms = []
				
				response.rows.forEach(function(element, index) {
					if(index < 10) {
//						gyms.push(`${index + 1}. [${element.name}](${domain}/gyms/${element.gymid}) (${element.uniqID}, ${element.gymid.toUpperCase()})`)

						gyms.push(`${index + 1}. [${element.name}](${domain}/gyms/${element.gymid}) (${element.gymid.toUpperCase()})`)
					}
				})

				const gembed = new Discord.MessageEmbed()
				gembed.setColor('#0099ff')
				//gembed.setAuthor('Hearty', `${domain}/images/icons/hearty.png`, `${domain}`)


				// One Gym
				if(response.rows.length == 1) {
				
					/*
					gembed.setAuthor(
						`${gym.name}`,
						`${domain}/images/icons/gym.png`, 
						`${domain}/Gyms/${response.gym.gymid}`
					)
					*/
					
					const attachment = new Discord
                      .MessageAttachment(`./public/images/gyms/${gym.gymid}.jpeg`, `${gym.gymid}.jpeg`);

					console.log('ATTACHMENT: ', attachment)

					gembed.title = gym.name
					gembed.url = `${domain}/Gyms/${response.gym.gymid}`
					
					gembed.attachFiles(attachment)
					
					//gembed.setImage(`http://heartyjessman.com/images/gyms/${gym.area_encoded}/${gym.name_encoded}.jpeg`)
					//gembed.setThumbnail(`http://heartyjessman.com/images/gyms/${gym.area_encoded}/${gym.name_encoded}.jpeg`)
			//		gembed.setThumbnail(`http://heartyjessman.com/images/gyms_by_id/${gym.gymid}.jpeg`)
//					gembed.setThumbnail(`${domain}/images/gyms/${gym.gymid}.jpeg`)
					//gembed.setImage(`${domain}/images/gyms/${gym.gymid}.jpeg`)
					
					gembed.setThumbnail(`attachment://${gym.gymid}.jpeg`);
				//	gembed.setImage(`attachment://${gym.gymid}.jpeg`);

					gembed.addField(
						`Address/Directions:`,
						`[${gym.address}](https://www.google.com/maps/search/${encodeURIComponent(gym.coordinates)} 'Get Directions')`
					)
				}

				
				// Many Gyms
				if(response.rows.length > 1 && !['by', 'in'].includes(response.method)) {

					/*
					gembed.setAuthor(
						`Search for "${response.q}"`,
						`${domain}/images/icons/gym.png`, 
						`${domain}/Gyms/${response.q}`
					)
					*/
					
					gembed.title = `Search for "${response.q}"`
					gembed.url = `${domain}/Gyms/${response.q}`
					
										
					if(response.rows.length <= 10) {
						gembed.addField(`Found ${response.rows.length} gyms matching "${response.q}"...`, gyms, true)
					} else {
						gembed.addField(`Showing 10 of ${response.rows.length} gyms:`, gyms, false)
						gembed.addField(`More:`, `[See more on heartyjessman.com](${domain}/Gyms/${response.q})`)
					}

				}


				// BY GYM
				if(response.method == 'by') {
				
					if(response.gym) {
						/*
						gembed.setAuthor(
							`Gyms near "${response.gym.name}"`,
							`${domain}/images/icons/gym.png`, 
							`${domain}/Gyms/${response.gym.gymid}`
						)
						*/
//						gembed.title = `Gyms near "${response.gym.name}"`
						gembed.title = response.gym.name
						gembed.url = `${domain}/Gyms/${response.gym.gymid}`
						gembed.setThumbnail(`http://heartyjessman.com/images/gyms_by_id/${gym.gymid}.jpeg`)
						gembed.addField(
							`Address/Directions:`,
							`[${gym.address}](https://www.google.com/maps/search/${encodeURIComponent(gym.coordinates)} 'Get Directions')`
						)

					} else {
						/*
						gembed.setAuthor(
							`Gyms near "${response.q}"`,
							`${domain}/images/icons/gym.png`, 
							`${domain}/Gyms/${response.q}`
						)
						*/
						gembed.title = `Gyms near "${response.q}"`
						gembed.url = `${domain}/Gyms/${response.q}`
					}
				
					gembed.addField('Nearby Gyms', gyms, true)		

				}


				// IN AREA
				if(response.method == 'in') {
				
					/*
					gembed.setAuthor(
						`${gym.area} Gyms (${response.rows.length})`,
						`${domain}/images/icons/gym.png`, 
						`${domain}/Gyms/${gym.area_encoded}`
					)
					*/
					
					
					gembed.title = `${gym.area} Gyms (${response.rows.length})`
					gembed.url = `${domain}/Gyms/${gym.area_encoded}`

					gembed.setThumbnail(`${domain}/images/icons/gym.png`)
				
					if(response.rows.length <= 10) {
						gembed.addField(`Found ${response.rows.length} gyms:`, gyms, false)
					} else {
						gembed.addField(`Showing 10 of ${response.rows.length} gyms:`, gyms, false)
						gembed.addField(`More:`, `[See more on heartyjessman.com](${domain}/Gyms/${gym.area_encoded})`)
					}

				}
			
				console.log(gembed)
			
				message.channel.send(gembed);
			
			} // IF FOUND

//		})() // ASYNC

	} // EXECUTE

} // MODULE.EXPORTS