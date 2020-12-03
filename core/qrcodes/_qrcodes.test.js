/**
 * Jest test file for qrcodes functions
 * @module
 * @name _qrcodes_tests
 * @category Core
 * @subcategory QRCodes
*/

const fs = require('fs')

const create = require('./create')

describe('QRCodes', () => {
	
	test('Create: Create qrcode with value "heartyjessman"', async () => {
		let result = await create({name:'heartyjessman.png', value:'heartyjessman'})
		expect(result).toHaveProperty('value', 'heartyjessman')
		expect(result).toHaveProperty('error', false)
	})
	
	test('Create: Create qrcode with "heartyjessman" again, with file already created.', async () => {
		
		let result = await create({name:'heartyjessman.png', value:'heartyjessman'})
		expect(result).toHaveProperty('value', 'heartyjessman')
		expect(result).toHaveProperty('error', false)
		
		// Remove test file.
		fs.unlinkSync('./data/cache/qrcodes/heartyjessman.png')
		
	})
	
})