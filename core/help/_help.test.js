/**
 * Jest test file for help functions
 * @module
 * @name _detect_help
 * @category Core
 * @subcategory Help
*/

const dotenv = require('dotenv')
//dotenv.config({ path: 'config/.env' })
dotenv.config({ path: 'config/.env_dev' })

const get = require('./get')
const list = require('./list')

describe('Help', () => {
	
	// GET
	test('Get: Fail command_set param', () => {
		let result = get('commands_bogus', 'boss')
		expect(result).toHaveProperty('error', true)
	})
	
	test('Get: Fail command param', () => {
		let result = get('commands_general', 'bogus')
		expect(result).toHaveProperty('error', true)
	})
	
	test('Get: Get "boss" help document for general commands.', () => {
		let result = get('commands_general', 'boss')
		expect(result).toHaveProperty('value.name', 'boss')
	})
	
	test('Get: Get "boss" help document for raid commands.', () => {
		let result = get('commands_raids', 'boss')
		expect(result).toHaveProperty('value.name', 'boss')
	})

	// LIST
	test('List: List general commands.', () => {
		let result = list('commands_general')
		//console.log(result)
		expect(result).toHaveProperty('error', false)
	})
	
	test('List: List bogus commands.', () => {
		let result = list('commands_bogus')
		//console.log(result)
		expect(result).toHaveProperty('error', true)
	})

})