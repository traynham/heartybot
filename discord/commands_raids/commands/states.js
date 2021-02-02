const Discord = require('discord.js')
const {colors, emoji, trainer_states} = require(`@config`).discord
const {help} = require(`@core`)

module.exports = {
	name: 'states',
	meta: help.get('commands_raids', 'states').value,
	execute(message) {
	
	// * Move trainer_states to help document?

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		embed.setTitle('**Trainer States**')
		embed.setDescription('You can use the following states to indicate your status or state for a raid.')	

		trainer_states.forEach( state => {
			embed.addField(
				`**:${state.emoji}: ${state.value}** (_${state.aliases.join(', ')}_)`,
				`${emoji.blank} ${state.description}`
			)
		})

		message.channel.send(embed)

	}

}