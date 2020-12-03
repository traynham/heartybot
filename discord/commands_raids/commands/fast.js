const Discord = require('discord.js');
const lowdb_raids = require('@models_lowdb/raids.js')

const {detect} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = {
	name: 'fast',
	aliases: ['fas'],
	synopsis: 'Show fast moves.',
	description: 'Show fast moves for raid boss.',
	syntax: ['fast'],
	usage: {'Show fast moves:': 'fast'},
	show_help_footer: false,
	cooldown: 5,
	execute(message, argv) {
		
		//let args = argv._
		//let raid = lowdb_raids.findRaid(message.channel.id)
		let raid = lowdb_raids.raids_find(message.channel.id)
		let boss_command = message.client.commands.find(cmd => cmd.name =='boss')
		let isEgg = detect.isEgg(raid.boss).value
		
		if(isEgg){
			const embed = new Discord.MessageEmbed()
			embed.setColor(colors.error)
			embed.setDescription('Sorry, the egg has not hatched yet. The boss will need to be set before I can show you its fast moves.')
			message.channel.send(embed)
			return
		}
		
		argv._ = ['fast', raid.boss]
		boss_command.execute(message, argv)

	}

}