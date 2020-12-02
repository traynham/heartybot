const help = require(`@data/help`)

//module.exports = (req) => {
module.exports = () => {

	let res = {
		count: Object.keys(help).length,
		value: {},
		values: [],
		error: false,
		error_message: ''
	}

	Object.keys(help).forEach(function(key) {

		let command = help[key]

		res.values.push(
			{
				name: command.name,
				synopsis: command.synopsis,
				description: command.description,
				syntax: command.syntax
			}
		)
		
	});
		
	return res

}