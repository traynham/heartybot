/**
 * Jest test file for gym functions
 * @module
 * @name _gyms_tests
 * @category Core
 * @subcategory Gyms
*/

const areas = require('./areas')
const find = require('./find')

describe('Core Gyms', () => {
	
	// ==========
	//    AREAS
	// ==========
	
	test('Areas: Get all areas', async () => {
		expect(await areas()).toBeTruthy
	})
	
	test('Areas: Find "Aurora"', async () => {
		expect(await areas('Aurora')).toHaveProperty('area', 'Aurora')
	})
	
	test('Areas: Find "Rhome"', async () => {
		expect(await areas('Rhome')).toHaveProperty('area', 'Rhome')
	})


	// ==========
	//    FIND
	// ==========
	
	// FIND » EX
	test('Find: Find "Ex"', async () => {
		let result = await find('Ex')
		expect(result).toHaveProperty('method', 'EX Raid Gyms')
	})
	
	// FIND » NAME
	test('Find: Find "frog"', async () => {
		let result = await find('frog')
		expect(result).toHaveProperty('gym.name', 'Frog')
		expect(result).toHaveProperty('method', 'name')
		expect(result).toHaveProperty('count', 1)
	})
	
	// FIND » BY
	test('Find: Find "by frog" (single gym)', async () => {
		let result = await find('by frog')
		expect(result).toHaveProperty('gym.name', 'Frog')
		expect(result).toHaveProperty('method', 'by')
		expect(result).toHaveProperty('count', 7)
	})
	
	// FIND » BY (Tests multiple gyms found AND near.)
	test('Find: Find "by willow" (multiple gym)', async () => {
		let result = await find('by willow')
		expect(result).toHaveProperty('gym.name', 'Ladybug Mural at Willow Creek Park')
		expect(result).toHaveProperty('method', 'by')
		expect(result).toHaveProperty('count', 8)
	})
	
	// FIND » ACRONYM
	test('Find: Find "Saginaw Park" using "sp" acronym', async () => {
		let result = await find('sp')
		expect(result).toHaveProperty('gym.acronym', 'sp')
		expect(result).toHaveProperty('method', 'acronym')
	})
	
	// FIND » NAME
	test('Find: Find "Saginaw Park" using "Saginaw Park" name', async () => {
		let result = await find('Saginaw Park')
		expect(result).toHaveProperty('gym.name', 'Saginaw Park')
		expect(result).toHaveProperty('method', 'name')
		expect(result).toHaveProperty('count', 1)
	})
	
	// FIND » LIKE NAME
	test('Find: Find "Saginaw Park" using "Sagi Park" like name', async () => {
		let result = await find('Sagi Park')
		expect(result).toHaveProperty('gym.name', 'Saginaw Park')
		expect(result).toHaveProperty('method', 'like name')
		expect(result).toHaveProperty('count', 1)
	})
	
	// FIND » FIELD (AREA)
	test('Find: Find "in Rhome"', async () => {
		let result = await find('in Rhome')
		expect(result).toHaveProperty('field', 'area')
		expect(result).toHaveProperty('method', 'isArea')
		expect(result).toHaveProperty('count', 7)	
	})
	
	// FIND » GYMID
	test('Find: Find "Rusty Farm Equipment at Eagle Mtn Park" using "g7" gymid.', async () => {
		let result = await find('g7')
		expect(result).toHaveProperty('gym.gymid', 'g7')
		expect(result).toHaveProperty('method', 'gymid')
		expect(result).toHaveProperty('count', 1)
	})
	
	// FIND » FIELD (shortid)
	test('Find: Find "The Y YMCA - Northwest" using "shortid p43CwF-C6O"', async () => {
		let result = await find('shortid p43CwF-C6O')
		expect(result).toHaveProperty('gym.name', 'The Y YMCA - Northwest')
		expect(result).toHaveProperty('method', 'valid field')
		expect(result).toHaveProperty('count', 1)
	})
	
	// FIND » Coordinate (General)
	test('Find: Find "Shady Grove Park 3" using "32.909287,-97.533585" (General Search)', async () => {
		let result = await find('32.909287,-97.533585')
		expect(result).toHaveProperty('gym.name', 'Shady Grove Park 3')
		expect(result).toHaveProperty('method', 'by')
		expect(result).toHaveProperty('count', 2)
	})
	
	// FIND » Coordinate (Exact)
	test('Find: Find "James Snodgrass Park Playscape" using "33.081021,-97.573031" (Exact Search)', async () => {
		let result = await find('coordinates 33.081021,-97.573031')
		expect(result).toHaveProperty('gym.name', 'James Snodgrass Park Playscape')
		expect(result).toHaveProperty('method', 'valid field')
		expect(result).toHaveProperty('count', 1)
	})

})