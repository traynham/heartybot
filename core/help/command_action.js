const help = require(`@data/help`)

module.exports = (req) => {

	let res = {
		count: 0,
		value: {},
		values: [],
		error: false,
		error_message: ''
	}


// TODO:
// * ADD SEARCH TRIE FUNCTIONALITY.
// * Error checking, better logic.

//	const q = Array.isArray(req) ? req.join(' ') : req
	
	const [q_command, q_action] = req

//	if(Object.keys(help).includes(q)){
	if(Object.keys(help).includes(q_command)){

		let command = help[q_command]

		let action = command.actions[q_action]

		console.log('ACTION: ', action)

		//res.value = help[q_command]
		res.value = action
		res.count = 1
	
	} else {

		res.error = true
		res.error_message = `Could not find action named "${q_action}"`

	}

	console.log('RESULT FOR ACTION: ', res)

	return res

}