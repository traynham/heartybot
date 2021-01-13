const Discord = require('discord.js');

const {discord, help, pokedex, util} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = {
	name: 'su',
	meta: help.get('commands_general', 'su').value,
//	aliases: ['admin'],
	//description: 'Get Pokemon Infos',
	cooldown: 5,
	execute(message, argv) {
		
		console.log(this.meta)
	
		let args = argv._
		
		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		
		// EXIT EARLY IF ATTEMPTED BY NON-SU ACCOUNT.
		if(!discord.hasRole(message, 'su')){			
			embed.setColor(colors.error)
			embed.setDescription('Sorry, this command is only for Super Users.')
			message.channel.send(embed)
			return
		}

// CHANGE: Make "update" an action and "pokedex" and "bosses" the possible values.
// CREATE: Make a `!help command actions` embed to display actions for a given command.
//         Then use `!help su actions` as the default action.

		// SHOW HELP
		if(argv.h || args.length == 0){
			console.log('You seem to want help!')
			embed.setColor(colors.successful)
			embed.setTitle('Super User Command Help')
			embed.setDescription('The following commands are available:')
			embed.addField('pokedex update', 'Download and process pokedex.')
			embed.addField('boss update', 'Download and process bosses, replacing current set. Use `!boss` command to add and remove single entry bosses.')
			message.channel.send(embed)
		}

		// ACTION: POKEDEX UPDATE
		if(args.join(' ') === 'pokedex update'){
			pokedex.update()
			embed.setColor(colors.success)
			embed.setDescription('Pokedex was updated. I mean it probably was anyway. You should probably double check.')
			message.channel.send(embed)
			return
		}
		
		
		// ACTION: POKEDEX UPDATE
		if(args.join(' ') === 'boss update'){
			let boss_update = util.update_bosses()
			embed.setColor(colors.success)
			embed.setDescription('Bosses were updated. I mean, they probably were. You should probably double check. Oh, and maybe do some error checking to make this more robust.')
			message.channel.send(embed)
			return
		}
		

	} // EXECUTE

} // MODULE.EXPORTS