const express = require('express');
const router = express.Router();

//const {general} = require(`@config`)
const config = require(`@config`)
const {pokedex} = require(`@core`)

// GET home page.
router.get('/infographics/types', function(req, res, next) {

	var payload = {
		type_images: config.general.pokemon.type_images,
		types: []
	}
	
	let {values: types} = pokedex.type('all')

	
	let filler = Array(5)
	
	types.forEach(function(record) {
	
		let current = {
			name: record.name
		}

		let weakTypes = [...record.weak_to.toLowerCase().split(', ').reverse(), ...filler]
		weakTypes.length = 5
		weakTypes.reverse()
		
		let strongTypes = [...record.super_effective.toLowerCase().split(', '), ...filler]
		strongTypes.length = 5

		
		current.weak = weakTypes
		current.strong = strongTypes

		payload.types.push(current)	
		
	})

	res.render('public/infographics/types', payload)

});


module.exports = router;