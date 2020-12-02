const dateFormat = require('dateformat')
const Discord = require('discord.js')
const lowdb_raids = require('@models_lowdb/raids.js')

const {colors, emoji, trainer_states} = require(`@config`).discord

module.exports = {
	name: 'list',
	aliases: ['l', 'ls', 'lis'],
	synopsis: 'List trainers.',
	description: 'List trainers and their status for the raid.',
	syntax: ['list {state}'],
	usage: {
		'To list trainers:': 'list',
		'To show trainers that are "here":': 'list here'
	},
	show_help_footer: true,
	cooldown: 5,
	execute(message, argv) {

		let args = argv._
		//let trainers = lowdb_raids.listTrainers(message.channel.id)
		let trainers = lowdb_raids.trainers_list(message.channel.id)
		let available_states = trainer_states.map(state => state.state)

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)
		embed.setTitle('**Trainer List**')

		// CHECK FOR ACTION STATE FILTER
		if(args.length > 0){

			let filter = args.join(' ')
			console.log(filter)
			let result = trainer_states.find(state => {
				if(state.state == filter || state.aliases.includes(filter)){
					available_states = [state.state]
					return true
				}
			})

			if(!result){
				embed.setColor(colors.error)
				embed.setTitle('**ERROR: Trainer List**')
				embed.setDescription('Sorry, I could not find that state. To see a list of states, use the `state` command')
				message.channel.send(embed)
				return
			}
		}

		if(trainers.count == 0){
			embed.setDescription('There are no trainers to list yet.')	
		} else {

			embed.setFooter(`Total Interested: ${trainers.value.length}`)

			// OBJECT OF STATES WITH TRAINERS FOR EACH STATE.
			let states = {}

			trainers.value.forEach( trainer => {
				if(available_states.includes(trainer.state)){
					if(!states[trainer.state]) states[trainer.state] = []
					let out = {
						team: trainer.team ? emoji[trainer.team.toLowerCase()] : emoji.question,
						people: trainer.people ? emoji[trainer.people] : emoji['1'],
						level: trainer.level ? '`' + trainer.level + '`' : '`  `',
						username: trainer.username,
						eta: trainer.eta ? `(ETA: ${dateFormat(trainer.eta, "h:MMTT")})` : ''
					}
					states[trainer.state].push(out)
				}
			})

			trainer_states.forEach( state => {
				if(states[state.state]){
					embed.addField(
						`**:${state.emoji}: ${state.value} (${states[state.state].length})**`,
						states[state.state].map(trainer =>{
							return `${Object.values(trainer).join(' ')}`
						}).join('\n') + `\n${emoji.spacer}`
					)
				}
			})
			
			// NO STATES TO SHOW.
			if(!Object.keys(states).length){
				embed.setDescription('Sorry, there are no trainers with that state for this raid.')
				message.channel.send(embed)
				return
			}

		}

		message.channel.send(embed)

	}

}