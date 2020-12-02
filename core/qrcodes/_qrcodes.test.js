/**
 * Jest test file for qrcodes functions
 * @module
 * @name _qrcodes_tests
 * @category Core
 * @subcategory QRCodes
*/

const create = require('./create')

describe('QRCodes', () => {
	
	test('Create: Create qrcode with value "heartyjessman"', async () => {
		let result = await create({name:'heartyjessman.png', value:'heartyjessman'})
		expect(result).toHaveProperty('value', 'heartyjessman')
		expect(result).toHaveProperty('error', false)
	})
	
/*	
	test('Create: Create qrcode with value "heartyjessman"', async () => {
		let result = await create({name:'heartyjessman.png', value:'heartyjessman', color: {dark: '#123456', light: '#eee'}})
		console.log(result)
		expect(result).toHaveProperty('value', 'heartyjessman')
		expect(result).toHaveProperty('error', false)
	})
	test('Create: Create qrcode with value "hearty/jessman" (Will cause error)', async () => {
		let result = await create({name:'hearty/jessman.png', value:'heartyjessman'})
		expect(result).toHaveProperty('value', 'heartyjessman')
		expect(result).toHaveProperty('error', true)
	})
*/
	
})