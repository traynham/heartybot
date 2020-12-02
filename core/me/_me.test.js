/**
 * Jest test file for Me functions
 * @module
 * @name _me_tests
 * @category Core
 * @subcategory Me
*/

const find = require('./find')
const findOrCreate = require('./findOrCreate')
const set = require('./set')

describe('Me', () => {

// ==========
//    FIND
// ==========

	test('Find: Find "heartyjessman" by snowflake', async () => {
		let result = await find('209016296552136704')
		expect(result).toHaveProperty('nickname', 'heartyjessman')
	})
	
	test('Find: Find "heartytestman" by nickname', async () => {
		let result = await find({nickname:'heartytestman'})
		expect(result).toHaveProperty('nickname', 'heartytestman')
	})
	
	test('Find: Find "heartyjessman" by trainer_code', async () => {
		let result = await find({trainer_code:'444329721291'})
		expect(result).toHaveProperty('nickname', 'heartyjessman')
	})


// ====================
//    FIND OR CREATE
// ====================

	test('findOrCreate: Find heartyjessman\'s record', async () => {
		let result = await findOrCreate({
			id: '209016296552136704',
			username: 'heartyjessman',
			discriminator: '1926'
		})
		expect(result).toHaveProperty('value.nickname', 'heartyjessman')
		expect(result).toHaveProperty('value.snowflake', '209016296552136704')
	})


// ==========
//    SET
// ==========

	test('Set: Set heartyjessman\'s team to "Valor"', async () => {
		let result = await set('646', {team:'Valor'})
		expect(result).toBe(1)
	})

})