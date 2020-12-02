const {colors, actions} = require('@config').discord

module.exports = ({embed}) => {

	embed.setColor(colors.error)
	embed.title = 'Error: Action not found.'
	embed.addField('Valid Actions', actions.sort())

}