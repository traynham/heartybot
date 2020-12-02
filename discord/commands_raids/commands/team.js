const Discord = require('discord.js');

const lowdb_raids = require('@models_lowdb/raids.js')
const {colors} = require(`@config`).discord
const {detect, discord, util} = require(`@core`)

module.exports = {
	name: 'team',
	aliases: ['tea'],
	synopsis: 'Show/set team.',
	description: 'Show/set your team for this raid.',
	syntax: ['team {instinct/mystic/valor}'],
	usage: {'To show your team:': 'team', 'To set team:': 'team valor'},
	show_help_footer: true,
	cooldown: 5,
	execute(message, argv) {

		let args = argv._
		//let action = argv.command
		let author = message.author
		//let value = args[0]
		//let trainer = lowdb_raids.findTrainer(message.channel.id, author)
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
		console.log(author)
		//let updateTrainer = lowdb_raids.updateOrCreateTrainer(message.channel.id, author)
		let updateTrainer = lowdb_raids.trainers_updateOrCreate(message.channel.id, author)
		let png = team.value.toLowerCase()
		
		console.log('UPDATE: ', updateTrainer)

		// SHOW SUCCESS
		embed.setColor(colors.success)
		embed.setTitle('**Team**')
		discord.setThumbnail(embed, `./public/images/icons/${png}.png`, `${png}.png`)
		embed.setDescription(`Your team was set to ${team.value}`)
		message.channel.send(embed)
	
	}

}