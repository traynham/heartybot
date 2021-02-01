const Discord = require('discord.js');
const lowdb_raids = require('@models_lowdb/raids.js')

const {help, detect} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = {
	name: 'perfect',
	meta: help.get('commands_raids', 'perfect').value,
	execute(message, argv) {
		
		argv.action = null

		let raid = lowdb_raids.raids_find(message.channel.id)
		let boss_command = message.client.commands.find(cmd => cmd.name =='boss')
		let isEgg = detect.isEgg(raid.boss).value
		
		if(isEgg){
			const embed = new Discord.MessageEmbed()
			embed.setColor(colors.error)
			embed.setDescription('Sorry, the egg has not hatched yet. The boss will need to be set before I can show you perfects.')
			message.channel.send(embed)
			return
		}
		
		argv._ = ['perfect', raid.boss]
		boss_command.execute(message, argv)

	}

}