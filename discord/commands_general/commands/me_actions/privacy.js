const {privacy} = require('@config').discord

module.exports = ({embed, member}) => {

	let hidden = member.privacy.split(',')
	let shown = privacy
	
	// FILTER OUT HIDDEN ITEMS.
	shown = shown.filter(function(item) {
		return !hidden.includes(item); 
	})
	
	embed.title = 'Privacy Settings'				
	embed.setDescription(`
		<@${member.snowflake}> , below are your privacy settings.
		\u200B
		**Note:** Your code will be shown if you use 
		\`!me code\` or \`!code\`, but will be hidden
		in all other situations.
		\u200B
	`)
	
	embed.addField('Hidden', (hidden.join(', ') || '~') + '\n\u200B', true)

	embed.addField('Shown', (shown.join(', ') || '~') + '\n\u200B' , true)

	embed.addField(
		'Show/Hide Items', '`!me show [item name]`\n\u200B`!me hide [item name]`\n\u200B',
	)
	
}