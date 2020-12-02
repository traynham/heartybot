const express = require('express');
const router = express.Router();

const {gyms} = require('../../../core')

// GET GYMS Q.
router.get('/gyms/:q', async function(req, res, next) {

	let payload = {
		area: await gyms.areas(req.params.q),
		gym: null,
		search_type: 'search',
		q: [req.params.q]
	}
	
	if(payload.area) payload.search_type = 'area'
	
	let response = await gyms.find({args: payload.q})
	
	if(response.rows.length == 1) payload.gym = response.rows[0]
	
	payload.response = response

	res.render('public/gyms/q', payload)

})

module.exports = router