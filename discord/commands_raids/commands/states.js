const Discord = require('discord.js')
const {colors, emoji, trainer_states} = require(`@config`).discord

module.exports = {
	name: 'states',
	aliases: ['state'],
	synopsis: 'List possible states.',
	description: 'Returns a list of possible trainer states for a raid.',
	syntax: ['states'],
	usage: {
		'To see list:': 'states',
	},
	show_help_footer: false,
	cooldown: 5,
	execute(message, argv) {
	
	// * Make a list action - use in help.
	// * Move trainer_states to help document?
	
		//let args = argv._

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