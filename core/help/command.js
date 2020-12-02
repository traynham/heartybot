const help = require(`@data/help`)

module.exports = (req) => {

	let res = {
		count: 0,
		value: {},
		values: [],
		error: false,
		error_message: ''
	}

	const q = Array.isArray(req) ? req.join(' ') : req

	if(Object.keys(help).includes(q)){

		res.value = help[q]
		res.count = 1
	
	} else {

		res.error = true
		res.error_message = `Could not find a command named "${q}"`

	}

	return res

}