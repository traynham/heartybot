/**
 *
 * Create a discord embed with a list of current bosses.
 *
 * @module Boss List
 * @author Jesse Traynham
 * @category Discord Commands
 * @subcategory General
 */

/**
 * @param {embed} embed Discord message embed.
 * @param {object} message Discord message
 * @function
 * @name boss
 */

const dateFormat = require('dateformat')
const bosses = require('@models_lowdb/bosses.js').bosses()
const {discord} = require(`@core`)
const {emoji} = require(`@config`).discord

module.exports = ({embed, message}) => {
	embed.setTitle('Boss List')
	discord.setThumbnail(embed, './public/images/icons/gym.png', 'gym.png')
	bosses.tiers.forEach(tier => embed.addField(`**${tier.name}**`, tier.value.join(', ') + `\n${emoji.spacer}`) )
	embed.setFooter('Updated: ' + dateFormat(bosses.date, "m/dd/yy h:MM TT"))
	message.channel.send(embed)
	return
}