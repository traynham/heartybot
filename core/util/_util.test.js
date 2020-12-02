/**
 * Jest test file for util functions
 * @module
 * @name _util_tests
 * @category Core
 * @subcategory Util
*/

const emoji = require('./emoji_img')
const file = require('./file')

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
	test('File: Create "test" folder', async () => {
		let result = file.createDir('test')
		expect(result).toHaveProperty('error', false)
	})
	
	test('File: Create file "test.json" in "test" folder', async () => {
		let result = file.createFile('test/test.json', {'test':'testing'})
		expect(result).toHaveProperty('error', false)
	})
	
	test('File: Create file "another_test.json" in "test/blah" folder', async () => {
		let result = file.createFile('test/blah/another_test.json', {test:'blah'})
		expect(result).toHaveProperty('error', false)
	})
	
})