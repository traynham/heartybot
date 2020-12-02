const express = require('express');
const router = express.Router();

const { help } = require('@core')


// GET home page.
router.get('/help/commands', function(req, res, next) {

	let payload = {
		commands: help.commands().values
	}

	res.render('public/help/commands', payload)

});


module.exports = router