const Discord = require('discord.js');

const {discord, help, pokedex, util} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = {
	name: 'su',
	meta: help.get('commands_general', 'su').value,
	execute(message, argv) {
	
		let args = argv._

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)

		// EXIT EARLY IF ATTEMPTED BY NON-SU ACCOUNT.
		// MOVE THIS FUNCTIONALITY TO INDEX.JS?
		if(!discord.hasRole(message, 'su')){			
			embed.setColor(colors.error)
			embed.setDescription('Sorry, this command is only for Super Users.')
			message.channel.send(embed)
			return
		}

		//IF NO PARAM, SHOW HELP.
		if(args.length == 0){
			argv._.push(this.name)
			const help_command = message.client.commands.find(cmd => cmd.name =='commands')
			help_command.execute(message, argv)
			return
		}

		let [actionDesired, value] = args		
		let actions = this.meta.actions

		let action = (
			actions.find(action => action.name == actionDesired) || 
			actions.find(action => action.aliases && action.aliases.includes(actionDesired)) ||
			null
		)

		let values = {
			'bosses': 'bosses',
			'dex': 'pokedex',
			'pokedex': 'pokedex'
		}
	
		let valueDesired = values[Object.keys(values).find(key => key.startsWith(value))]

		if(argv.u || action.name === 'update'){

			embed.setColor(colors.success)

			if(valueDesired === 'bosses'){
				util.update_bosses()
				embed.setDescription('Bosses were updated.')
				console.log('update bosses')
			}

			if(valueDesired === 'pokedex'){
				pokedex.update()
				embed.setDescription('Pokedex was updated.')
					console.log('update pokedex')
				}

			message.channel.send(embed)
			return

		}

	} // EXECUTE

} // MODULE.EXPORTS