/**
 * Jest test file for util functions
 * @module
 * @name _util_tests
 * @category Core
 * @subcategory Util
*/

const emoji = require('./emoji_img')
const file = require('./file')
const obj2QueryString = require('./obj2QueryString')
const payload = require('./payload')
const trainerCodeFormat = require('./trainerCodeFormat')

describe('Core › Util', () => {


	// EMOJI
	test('Emoji: get emoji link for "hash"', () => {
		let result = emoji('hash')
		expect(result).toHaveProperty('value', 'https://images.weserv.nl/?url=raw.githubusercontent.com%2Fiamcal%2Femoji-data%2Fmaster%2Fimg-apple-160%2F0023-fe0f-20e3.png')
		expect(result).toHaveProperty('error', false)
	})
	
	test('Emoji: get emoji link for "coffee" and use opt to set height to 25.', () => {
		let result = emoji('coffee', {h: 25})
		expect(result).toHaveProperty('value', 'https://images.weserv.nl/?h=25&url=raw.githubusercontent.com%2Fiamcal%2Femoji-data%2Fmaster%2Fimg-apple-160%2F2615.png')
		expect(result).toHaveProperty('error', false)
	})
	
	test('Emoji: get emoji link for "bogus"', () => {
		let result = emoji('bogus')
		expect(result).toHaveProperty('value', 'https://images.weserv.nl/?url=raw.githubusercontent.com%2Fiamcal%2Femoji-data%2Fmaster%2Fimg-apple-160%2F2754.png')
		expect(result).toHaveProperty('error', true)
	})

	
	// FILE
	test('File: Create "../test" folder', () => {
		let result = file.createDir('../test')
		expect(result).toHaveProperty('error', false)
	})

	test('File: Create file "test.json" in "test" folder', () => {
		let result = file.createFile('../test/test.json', {'test':'testing'})
		expect(result).toHaveProperty('error', false)
	})
	
	test('File: Create file "test.json" in "test" folder with overwrite set to false.', () => {
		let result = file.createFile('../test/test.json', {'Nope':'do not write'}, {overwrite: false})
		expect(result).toHaveProperty('error', false)
	})
	
	test('File: Create file "another_test.json" in "test/blah" folder', () => {
		let result = file.createFile('../test/blah/another_test.json', {test:'blah'})
		expect(result).toHaveProperty('error', false)
	})
	
	//obj2QueryString
	test('obj2QueryString: Convert object to query string.', async () => {
		let result = obj2QueryString({test:'blah', one: 'two', three: 'four'})
		expect(result).toBe('test=blah&one=two&three=four')
	})
	
	//Payload
	test('Payload: Create payload object.', async () => {
		let result = payload()
		expect(result).toHaveProperty('value', null)
		expect(result).toHaveProperty('error', false)
		expect(result).toHaveProperty('error_message','')
	})
	
	//trainerCodeFormat
	test('trainerCodeFormat: Format "123456789201" code.', async () => {
		let result = trainerCodeFormat('123456789201')
		expect(result).toBe('1234 5678 9201')
	})
	
	test('trainerCodeFormat: Format empty code.', async () => {
		let result = trainerCodeFormat('')
		expect(result).toBe('•••• •••• ••••')
	})

})