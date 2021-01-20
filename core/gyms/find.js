/**
 * Find a gym. Much more complicated than you'd think.
 * 
 * ## GYMS.FIND
 *
 * A stack of finds to locate a gym or gyms. The stack attempts to find gyms from the
 most unique query to the more generic queries.
 *
 * ## QUIERY STACK:
 * This module takes several kinds of searches into account to try to get the most 
 * unique result. It is weighted in the sense that more unique search types are tried first.
 *
 * | Type                     	| Description                                  	|
 * |--------------------------	|----------------------------------------------	|
 * | BY EX                    	| Find all EX Raid Gyms                        	|
 * | BY FIELD IN VALID_FIELDS 	| Search by a specific field, such as shortid. 	|
 * | BY ACRONYM               	| Search by acronym (Can return more than one!)	|
 * | BY NAME                  	| Search by exact name.                        	|
 * | BY LIKE NAME             	| Search by partial name.                      	|
 * | BY LIKE SEARCHALL        	| Search by several fields. (DISABLED!)        	|
 * | BY  "By"                 	| Gyms close the first gym already found.      	|
 *
 * **SEARCHALL** includes: area, name, acronym, search_extras, aka, and coordinates
 *
 * ## SYNTAX
 * gyms.find(q, method)
 *
 * ## RETURNS (PAYLOAD)
 * | Key           	| Description                                         	|
 * |---------------	|-----------------------------------------------------	|
 * | gym: {}      	| SINGLE GYM IF APPLICABLE											|
 * | findBY: ''   	| STRING INDICATING WHICH FIND METHOD RENDERED RESULTS	|
 * | rows: []     	| ALL FOUND ROWS, EVEN IF ONLY ONE ITEM WAS FOUND			|
 * 
 * ## HISTORY
 * - 07-29-20 Birth
 * - 08-01-20 Moved to a new model where I'm use a for loop to loop through desired searches. Refactored. Commented.
 * - 08-03-20 Switched to receiving an object for more flexibility. This also allowed for field finds and "by" to work.
 * - 09-08-20 Added area check code so that areas area checked automatically. No need for "in" action.
 * - 09-08-20 Updated the "by" method to allow for a coordinates from the Q. This way it can find nearby gyms from either a known gym coord or from a general coord such as passed by a web browser.
 *
 * -----  
 *
 * @example
 * gyms.find('frog')                     // Frog
 * gyms.find('rhome', 'area')            // List of gyms in Rhome.
 * gyms.find('sSPixD2W9X', 'shortid')    // Boo-Rays Bayou Mural
 *
 * @module
 * @name find
 * @category Core
 * @subcategory Gyms
 * @returns payload
 * @todo Build tests
 * @todo Consider adding offset/limit and other options for pagination in a third function param, likely just use an object.
 * @todo Use uniqID instead of acronym field. Need to update db to generate those first!
*/

const geolib = require('geolib')
const Op = require('sequelize').Op

const Gyms = require(`@models/gyms`)
const areas = require('@core/gyms/areas')

module.exports = async (query) => {

	let res = {}	
	let q = !Array.isArray(query) ? String(query).split(' ') : query
	let action = String(q[0]).toLowerCase()
	
	res.action = action
	
	let valid_fields = ['area', 'coordinates', 'shortid', 'uniqid']
	let valid_methods = ['by', 'in','ex']	

	let valid_method = valid_methods.find(method => method == action)
	let valid_field = valid_fields.find(field => field == action)
	
	if(valid_method || valid_field){
		q.shift()
	}

	let req = {}
	req.q = String(q.join(' ')).toLowerCase()
	res.q = req.q
	
	let methods = [
		{ name: 'gymid', method: {gymid: req.q} },
		{ name: 'acronym', method: {acronym: req.q} },
		{ name: 'name', method: {name: {[Op.like]: req.q}} },
		{ name: 'like name', method: {name: {[Op.like]: `%${req.q.replace(' ', '%')}%`}} },
		//{ name: 'Like SearchAll', method: {searchall: {[Op.like]: `%${req.q.replace(' ', '\%')}%`}} }
	]

	if(valid_field){
		methods.unshift({name: 'valid field', method: {[valid_field]: q} })
	}

	let isArea = await areas(q)
	
	if(isArea) {
		res.field = 'area'
		res.method = 'in'
		methods.unshift({name: 'isArea', method: {area: isArea.area} })		
	}

	// BY EX - Find all EX Raid Gyms
	if(valid_method == 'ex') {
		methods.unshift({name: 'EX Raid Gyms', method: {amenities: {[Op.like]: '%EX Raid Gym%'}}})
	}

	// LOOP THROUGH METHODS STACK AND FINDALL
	for (let i = 0; i < methods.length; i++) {
	
		let value = methods[i]

		let where = {status: 'Yes', ...value.method}
		
		res.seq = JSON.stringify({where: where, order: [['name', 'ASC']]})
		
		res.rows = await Gyms.findAll({where: where, order: [['name', 'ASC']]})

		res.gym = res.rows[0]
		
		if(res.rows.length > 0) {
			res.method = value.name
			break
		}

	} // FOR	

	let gym_coordinates = req.q.split(',')
	let isValidCoordinate = geolib.isValidCoordinate({ latitude: gym_coordinates[0], longitude: gym_coordinates[1] })
	
	if(isValidCoordinate && res.rows.length == 0){
		valid_method = 'by'
	}

	// BY (AROUND) -- TAKES COORDINATES FROM Q OR THE FIRST FOUND GYM.
	if(valid_method == 'by') {

		let gym_coordinates = req.q.split(',')
		let isValidCoordinate = geolib.isValidCoordinate({ latitude: gym_coordinates[0], longitude: gym_coordinates[1] })

		if(!isValidCoordinate && res.rows.length > 0) {
			res.gym = res.rows[0]
			gym_coordinates = res.rows[0].coordinates.split(',')
			isValidCoordinate = geolib.isValidCoordinate({ latitude: gym_coordinates[0], longitude: gym_coordinates[1] })
		}

		if(isValidCoordinate) {

			let by = []

			let findall = await Gyms.findAll({where: {status: 'Yes'}, order: [['name', 'ASC']]})

			findall.forEach(function(element) {

				let coordinate = element.coordinates.split(',')
			
				let isBy = geolib.isPointWithinRadius(
					{ latitude: gym_coordinates[0], longitude: gym_coordinates[1] },
					{ latitude: coordinate[0], longitude: coordinate[1] },
					1000
				)

				//if(isBy && res.gym.id != element.id){by.push(element)}
				if(isBy){by.push(element)}
			
			})

			res.rows = by
			if(!res.gym) res.gym = by[0]
			res.method = 'by'
			
		} // IF ISVALIDCOORDINATE
	
	} // BY

	res.count = res.rows.length
	return res

}
