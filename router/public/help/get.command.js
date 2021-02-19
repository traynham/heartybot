const express = require('express');
const router = express.Router();

const help = require('../../../data/help')
const {prefix} = require('../../../config/main')

// GET home page.
//router.get('/help/commands/:command', function(req, res, next) {
router.get('/help/commands/:command', function(req, res) {

res.render('public/index')

	let payload = {
		prefix: prefix,
		command: help[req.params.command]
	}
console.log(req)
/*	
	console.log(help)
	
	
//	console.log(Object.keys(help))
	

	Object.keys(help).forEach(function(key) {

		let command = help[key]

		console.log(command);

		payload.commands.push(
			{
				name: command.name,
				description_short: command.description_short,
				description: command.description,
				syntax: command.syntax
			}
		)
		
	});

*/
	console.log(payload)

	res.render('public/help/command', payload)

	
	
});


module.exports = router;