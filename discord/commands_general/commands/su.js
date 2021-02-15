const Discord = require('discord.js')

const {help, pokedex, util} = require(`@core`)
const {colors} = require(`@config`).discord

const jeeves = require('@root/discord/jeeves')

module.exports = {
	name: 'su',
	meta: help.get('commands_general', 'su').value,
	execute(message, argv) {
	
		let args = argv._
		let action = (argv.action ? argv.action : null)

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)

		//HELP
		if(action.name === 'help'){
			argv._.push(this.name)
			const help_command = message.client.commands.find(cmd => cmd.name =='commands')
			help_command.execute(message, argv)
			return
		}
		
		//JEEVES
		if(action.name === 'jeeves'){
			jeeves(message.client)
			return
		}

		let value = args.join(' ')	

		let values = {
			'bosses': 'bosses',
			'dex': 'pokedex',
			'pokedex': 'pokedex'
		}
	
		let valueDesired = values[Object.keys(values).find(key => key.startsWith(value))]

		// UPDATE
		if(argv.u || action.name === 'update'){

			embed.setColor(colors.success)

			if(valueDesired === 'bosses'){
				util.update_bosses()
				embed.setDescription('Bosses were updated.')
			}

			if(valueDesired === 'pokedex'){
				pokedex.update()
				embed.setDescription('Pokedex was updated.')
			}

			message.channel.send(embed)
			return

		}

	} // EXECUTE

} // MODULE.EXPORTS