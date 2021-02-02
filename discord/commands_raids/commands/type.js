const Discord = require('discord.js');
const lowdb_raids = require('@models_lowdb/raids.js')

const {detect, help} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = {
	name: 'type',
	meta: help.get('commands_raids', 'type').value,
	execute(message, argv) {
		
		argv.action = null

		let raid = lowdb_raids.raids_find(message.channel.id)
		let boss_command = message.client.commands.find(cmd => cmd.name =='boss')
		let isEgg = detect.isEgg(raid.boss).value
		
		if(isEgg){
			const embed = new Discord.MessageEmbed()
			embed.setColor(colors.error)
			embed.setDescription('Sorry, the egg has not hatched yet. The boss will need to be set before I can show you its type.')
			message.channel.send(embed)
			return
		}
		
		argv._ = ['type', raid.boss]
		boss_command.execute(message, argv)

	}

}