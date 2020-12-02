const express = require('express');
const router = express.Router();

const {gyms} = require('../../../core')
//const db = required(`/models/${config.section}`)

// GET home page.
router.get('/gyms/near', function(req, res, next) {

	(async () => {
	
		let args = {
			args: ['in', 'rhome']
		}

		let response = await gyms.find(args)


		console.log(response)

		res.render('public/gyms/near')
	
	})() // ASYNC

});


module.exports = router;