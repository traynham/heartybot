/**
 * Create a help discord embed given a message, argv, and command_set string.
 *
 * -----
 * @module Embed Command (help)
 * @author Jesse Traynham
 * @category Core
 * @subcategory Discord
 */
 
/**
 * @param {object} message A discord message object.
 * @param {array} argv Arguments array.
 * @param {string} command_set Name of command set to pull help document from.
 * @function
 * @name embedCommand
 */
const Discord = require('discord.js');

const {colors, emoji} = require(`@config`).discord

const payload_obj = require('@core/util/payload')

module.exports = (message, args, command_set) => {

	const {util} = require(`@core`)

	let payload = payload_obj()

	let commands = message.client[command_set]
	let help = {}
	
	let user_roles = []
	
	if(message.channel.type === 'text'){
		user_roles = Array.from(message.member.roles.cache.values()).map(role => role.name.toLowerCase())
	}

	const embed = new Discord.MessageEmbed()
	embed.setColor(colors.primary)
	embed.setThumbnail(util.emoji_img('book', {h: 25}).value)

	payload.value = embed

	const help_footer =	'__________\n' +
								'Items in [square brackets] are required.\n' +
								'Items in {curly brackets} are optional.'

	const commandName = args[0]

	const command = (
		commands.get(commandName) || 
		commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName)) ||
		commands.find(cmd => cmd.meta && cmd.meta.aliases && cmd.meta.aliases.includes(commandName))
	)

	if(command) help = command.meta

	// IF COMMAND IS NOT FOUND, BUT REQUESTED.
	if(args.length > 0 && !command){
		payload.error = true
		payload.error_message = 'Sorry. There is no help for that command.'
		embed.setTitle(`**HELP ERROR**`)
		embed.setColor(colors.error)
		embed.setDescription(payload.error_message)
		return payload
	}

	// IF ACTION REQUEST
	if(args.length > 1 && help){

		let requested_action = args[1]

		let action = help.actions.find(action =>
				action.name == requested_action || 
				(action.aliases && action.aliases.includes(requested_action))
		)

		if(!action){
			payload.error = true
			payload.error_message = `Sorry. That action was not found.`
			embed.setTitle(`**HELP ERROR**`)
			embed.setColor(colors.error)
			embed.setDescription(payload.error_message)
			return payload
		}

		embed.setTitle(`**HELP › ${help.name} › ${action.name}**`)
		embed.setDescription(`${action.description}\n${emoji.spacer}`)

		if(action.aliases) {
			embed.addField('**Aliases**', action.aliases.join(', ') + `\n${emoji.spacer}`)
		}

		if(action.syntax){
			embed.addField('**Syntax**', '`' + action.syntax + '`' + `\n${emoji.spacer}`)
		}

		if(action.examples){
			let examples = action.examples.map(entry => {
				let [description, code] = entry
				return	`_${description}_\n` + emoji.blank + '`' + code + '`' + `\n${emoji.spacer}`
			})	
			embed.addField('**Examples**', examples)
		}
		
		if(action.values){
			embed.addField('**Possible Values**', action.values)
		}

		if(help.show_help_footer){embed.setFooter(help_footer)}

		return payload
	}
	
	// COMMAND DETAIL
	if(args.length > 0 && help){
		
		// ROLE PERMISSION CHECK.
		if(help.roles && help.roles.length && !user_roles.includes(help.roles[0])){
			embed.setTitle(`HELP › **ERROR**`)
			embed.setDescription('Sorry, you do not have permission to use this command.')
			return payload
		}

		embed.setTitle(`HELP › **${help.name}**`)
		embed.setDescription(`${help.description}\n${emoji.spacer}`)

		if(help.aliases && help.aliases.length){
			embed.addField('**Aliases**', help.aliases.join(', ') + `\n${emoji.spacer}\n`)
		} 

		if(help.actions.length > 0) {

			let actions = []

			help.actions.forEach(action => {
				if(action.roles && !user_roles.includes(action.roles[0])) { return }
				actions.push(
					//action.name + (
				//	action.default ? ' (Default)' : '') + `: ${action.synopsis}`
					`_**${action.name} ${action.default ? '(Default)' : ''}**_: ${action.synopsis}`
				)
			})

			embed.addField(
				'**Actions**', 
				actions.join('\n') + '\n\nUse `?' + help.name + ' [action]` for addtional help.\n' + emoji.spacer
			)

		}

		if(help.syntax) embed.addField('**Syntax**', '`' + help.syntax + '`' + `\n${emoji.spacer}`)

		if(help.usage){
			let usage = help.usage.map(entry => {
				let [description, code] = entry
				return	`_${description}_\n` + '`' + code + '`' + `\n${emoji.spacer}`
			})	
			embed.addField('**Usage**', usage)
		}

		// FOOTER
		let footer = `Revision: ${help.revision}`		
		if(help.show_help_footer){footer += `\n${help_footer}`}
		embed.setFooter(footer)

		return payload

	}

	// COMMAND LIST
	embed.setTitle('**Command List**')
	
	const data = []
	
	data.push('Use `?[command name]` for more details, for example, `?boss`.\n');
	
	commands.forEach(command => {
		
		let hasRoleRequirement = command.meta && command.meta.roles && command.meta.roles.length

		if(
			(hasRoleRequirement && user_roles.includes(command.meta.roles[0])) ||
			!hasRoleRequirement
		){
			data.push(`**${command.name}**: ${command.meta ? command.meta.synopsis : ''}`)
		}

	})

	embed.setDescription(data)
	embed.setFooter(help_footer)
	
	return payload
	
}