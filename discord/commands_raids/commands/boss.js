const Discord = require('discord.js');
const lowdb_raids = require('@models_lowdb/raids.js')

const {detect, discord, pokedex} = require(`@core`)

const {colors, emoji} = require(`@config`).discord

module.exports = {
	name: 'boss',
	aliases: ['b', 'bos'],
	actions_admin: ['add', 'remove', 'update'],
	actions: [
		{
		name: 'add',
		aliases: [],
		synopsis: 'Add a boss to the bosses list.'
		},
		{
		name: 'list',
		aliases: ['ls'],
		synopsis: 'List current bosses.'
		},
		{
		name: 'remove',
		aliases: ['rem', 'rm'],
		synopsis: 'Remove a boss from the bosses list.'
		},
		{
		name: 'update',
		aliases: [],
		synopsis: 'Update the bosses list.'
		},
	],
	synopsis: 'Set/Show boss.',
	description: 'Set or show the boss for the current raid.',
	syntax: ['boss {boss name}'],
	usage: {'To show boss:': 'boss', 'To set boss:': 'boss {mewtwo}'},
	show_help_footer: true,
	cooldown: 5,
	execute(message, argv) {

		const boss_command = message.client.commands.find(cmd => cmd.name =='boss')

		let args = argv._
		let action = null
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
		
		// EXIT EARLY IF ADMIN ACTION ATTEMPT BY NON-ADMIN.
		if(this.actions_admin.includes(args[0]) && !discord.isAdmin(message)){			
			embed.setColor(colors.error)
			embed.setDescription('Sorry, this action requires an admin account.')
			message.channel.send(embed)
			return
		}
		
		// PASS SELECTED ACTIONS TO MAIN BOSS COMMAND
		if(['add', 'list', 'ls', 'remove', 'rm', 'update'].includes(args[0])){
			if(['list', 'ls'].includes(args[0])) args.shift()
			boss_command.execute(message, argv)
			return
		}

		// ACTION: SET BOSS IF NO ACTION.
		if(!action && args.length) {
			action = 'set'
		}
		
		// RUN ACTION
		if(action) {
			var data = {embed, args, message}
			require(`./boss_actions/${action}`)(data)
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
