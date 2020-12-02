/*

	IT MAY BE BETTER TO CACHE THE ROLE IDS SOMEWHERE
	NEED TO FIGURE OUT HOW TO ALLOW AREAS. WILL LIKELY TAKE SETTING UP A GUILD PREFS AREA SOMEWHERE.

*/

module.exports = (message, role) => {

	let teams = ['valor', 'mystic', 'instinct']

	let isTeam = true // NEED TO RUN THROUGH DETECT.TEAM
	
	if(isTeam){
		// REMOVE REQUESTED TEAM ROLE FROM TEAMS ARRAY
		teams = teams.filter(e => e !== role.toLowerCase())
	}

	let result = message.guild.roles.cache.find(r => r.name.toLowerCase() === role.toLowerCase())
	let addRoll = message.member.roles.add(result)

	// THIS IS WAY TO SLOW!?!?!?!
	teams.forEach(function(element) {

		let result = message.guild.roles.cache.find(r => r.name.toLowerCase() === element.toLowerCase())
		let removeRoll = message.member.roles.remove(result)

	})

}