/**
 * Jest test file for help functions
 * @module
 * @name _detect_help
 * @category Core
 * @subcategory Help
*/

const get = require('./get')

describe('Help', () => {
	
	// GET
	test('Get: Fail command_set param', () => {
		let result = get('commands_bogus', 'boss')
		//console.log(result)
		expect(result).toHaveProperty('error', true)
	})
	
	test('Get: Fail command param', () => {
		let result = get('commands_general', 'bogus')
		//console.log(result)
		expect(result).toHaveProperty('error', true)
	})
	
	test('Get: Command_set param', () => {
		let result = get('commands_general', 'boss')
		//console.log(result)
		expect(result).toHaveProperty('error', false)
	})
	

	
})