const express = require('express');
const router = express.Router();

//const {gyms} = require('../../../core')

// GET home page.
router.get('/help', function(req, res, next) {

	
		res.render('public/help')
	
	
	
});


module.exports = router;