const Discord = require('discord.js')
const onlyEmoji = require('emoji-aware').onlyEmoji

const {help} = require(`@core`)
const {colors} = require(`@config`).discord

module.exports = {
	name: 'poll',
	meta: help.get('commands_general', 'poll').value,
	async execute(message, argv) {

		let action = (argv.action ? argv.action : null)

		//HELP
		if(action && action.name === 'help'){
			argv._.push(this.name)
			const help_command = message.client.commands.find(cmd => cmd.name =='commands')
			help_command.execute(message, argv)
			return
		}
		
		// EMOJI ID GENERATOR FUNCTION.
		function* emojiID() {
			let id = 1

			let numbers = [
				'0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'
			]
		
			while (true) {
				yield numbers[id]
				id++
			}
		}

		const embed = new Discord.MessageEmbed()
		embed.setColor(colors.primary)

		// FIX CUSTOM EMOJIS BY REMOVING COLONS AND NAME
		argv.query = argv.query.replace(/<:.*?:(.*?)>/g, '<<$1>>')
		
		let data = argv.query.split(':')

		// ADJUST INPUT AS NEEDED...
		if(data.length === 2) { data = [data[0], null, data[1]] }
		if(data.length === 1) { data = [null, null, data[0]] }

		let poll = {
			title: data[0],
			description: data.length === 3 ? data[1] : null,
			choices: String(data.length === 3 ? data[2] : data[1]).split(','),
			emojis: []
		}

		let getEmoji = emojiID()
		poll.choices.forEach( (choice, i) => {

			let isCustom = false

			// GET EMOJI ID
			let emoji = getEmoji.next().value

			// CHECK CHOICE FOR REGULAR EMOJI
			let emoji_check = onlyEmoji(choice)

			if(emoji_check.length === 1) {
				emoji = emoji_check[0]
				choice = choice.replace(emoji, '')
			}

			// CHECK CHOICE FOR CUSTOM EMOJI
			let emoji_custom_check = choice.match(/<<(.*)>>/)

			if(emoji_custom_check) {
				isCustom = true
				emoji = emoji_custom_check[1]
				choice = choice.replace(emoji_custom_check[0], '')
			}
		
			// PUSH EMOJI TO POLL
			poll.emojis.push(emoji)

			if(isCustom){
				poll.choices[i] = `<:custom:${emoji}> ${choice.trim()}`
			} else {
				poll.choices[i] = `${emoji} ${choice.trim()}`
			}

		})

		// SEND ERROR MESSAGE IF LACKING CHOICES
		if(poll.choices.length < 2){
			embed.setTitle('**Error**')
			embed.setColor(colors.error)
			embed.setDescription('You need at least two choices for the poll.')
			message.channel.send(embed)
			return
		}

		embed.setTitle(`**POLL**${poll.title ? ': ' + poll.title : ''}`)

		embed.setDescription(poll.choices.join('\n'))
		if(poll.description){
			embed.setDescription(poll.description + '\n\n' + embed.description)
		}

		// SEND MESSAGE AND ADD REACTIONS
		await message.channel.send(embed).then(async message => {
			poll.emojis.forEach( async emoji => { await message.react(emoji) })
		})
	
	}

} // MODULE.EXPORTS