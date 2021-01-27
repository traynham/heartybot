const Discord = require('discord.js');
const lowdb_raids = require('@models_lowdb/raids.js')

const {detect, discord, help, pokedex} = require(`@core`)

const {colors, emoji} = require(`@config`).discord

module.exports = {
	name: 'boss',
	meta: help.get('commands_raids', 'boss').value,
	cooldown: 5,
	execute(message, argv) {

		const boss_command = message.client.commands.find(cmd => cmd.name =='boss')

		let args = argv._
		let action = (argv.action ? argv.action : null)

		let raid = lowdb_raids.raids_find(message.channel.id)
		let isEgg = detect.isEgg(raid.boss).value

		// EXIT EARLY IF RAID NOT FOUND.
		if(!raid){
			// I'm not sure how this would trigger.
			console.log('Raid not found')
			return true
		}

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)

		// SHOW
		if(action && action.name == 'show'){
			argv._ = raid.boss.split(' ')
			argv.action = null
			boss_command.execute(message, argv)
			return
		}

		// PASS SELECTED ACTIONS TO MAIN BOSS COMMAND
		// CHECKING ACTUAL BOSS_COMMAND ACTIONS!
		if(action && boss_command.meta.actions.map(act => act.name).includes(action.name)){
			boss_command.execute(message, argv)
			return
		}


		// ACTION: SET BOSS IF NO ACTION.
		if(!action && args.length) {
			action = {name: 'set'}
		}

		// RUN ACTION
		if(action) {
			var data = {embed, args, message}
			require(`./boss_actions/${action.name}`)(data)
			return
		}

		// SHOW BOSS
		discord.embedPokemon(embed, raid.boss)
		embed.title = '**BOSS: ** ' + embed.title

		if(!isEgg){
			let perfects = pokedex.perfect(raid.boss, 20)

			embed.addField(
				'**Perfect**',
				`${emoji.blank}${perfects.value.perfect}\n${emoji.blank}${perfects.value.perfect_boosted} (Boosted)\n${emoji.blank}${perfects.value.perfect_maxed} (Maxed)\n\u200B\n`
			)
		}

		// SEND MESSAGE
		message.channel.send(embed)

	}

}
