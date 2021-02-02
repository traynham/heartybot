const Discord = require('discord.js');

const lowdb_raids = require('@models_lowdb/raids.js')
const {colors} = require(`@config`).discord
const {detect, discord, help, util} = require(`@core`)

module.exports = {
	name: 'team',
	meta: help.get('commands_raids', 'team').value,
	execute(message, argv) {

		let args = argv._
		let author = message.author
		let trainer = lowdb_raids.trainers_find(message.channel.id, author)
		let team = detect.team(args)
	
		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		embed.setTitle('**Team**')
		embed.setThumbnail(util.emoji_img('busts_in_silhouette', {h: 25}).value)
		embed.setFooter(`${author.username}`, `${author.displayAvatarURL()}`)

		// SHOW TEAM
		if(args.length === 0){
			let team = trainer.value.team.toLowerCase()
			embed.setDescription(`Your team is ${trainer.value.team}`)
			discord.setThumbnail(embed, `./public/images/icons/${team}.png`, `${team}.png`)
			message.channel.send(embed)
			return
		}

		// SHOW INVALID TEAM
		if(team.error){
			embed.setColor(colors.error)
			embed.setTitle('**ERROR: Team**')
			embed.setDescription('Please enter a valid team name. Valid names are Valor, Mystic, or Instinct.')
			message.channel.send(embed)
			return
		}

		// UPDATE TRAINER
		author.team = team.value
		lowdb_raids.trainers_updateOrCreate(message.channel.id, author)
		let png = team.value.toLowerCase()

		// SHOW SUCCESS
		embed.setColor(colors.success)
		embed.setTitle('**Team**')
		discord.setThumbnail(embed, `./public/images/icons/${png}.png`, `${png}.png`)
		embed.setDescription(`Your team was set to ${team.value}`)
		message.channel.send(embed)
	
	}

}