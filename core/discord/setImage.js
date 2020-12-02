/**
 * Set Image in an embed using an image file attachment.
 *
 * -----
 * @module setImage
 * @author Jesse Traynham
 * @category Core
 * @subcategory Discord
 */

/**
 * @param {object} embed A discord message embed object.
 * @param {string} path Path of the image from the root of the app.
 * @param {string} name Name of the image which is used for the attachment name.
 * @param {object} data Extra data
 * @function
 * @name setImage
 * @returns {embed}
 */
module.exports = (embed, path, name, data) => {

	const Discord = require('discord.js')
	
	const attachment = new Discord.MessageAttachment(path, name, data);
	embed.attachFiles(attachment)
	embed.setImage(`attachment://${name}`)

	return embed

}