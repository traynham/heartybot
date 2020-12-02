const express = require('express');
const router = express.Router();

const {gyms} = require('../../../core')


// GET GYM AREAS.
router.get('/gyms', async function(req, res, next) {

	let payload = {
		areas: []
	}

	let areas = await gyms.areas()
	
	Object.keys(areas).forEach(function(area){
		payload.areas.push(areas[area])
	})

	res.render('public/gyms/list', payload)

})


module.exports = router