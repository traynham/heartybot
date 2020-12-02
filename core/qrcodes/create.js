/**
 * Create a qr code.
 * @module
 * @name create
 * @category Core
 * @subcategory QRCodes
*/


const fs = require('fs')
const QRCode = require('qrcode')
const payload_obj = require('@core/util/payload')


/*
{
	name: 'heartyjessman.png',
	value: 'heartyjessman',
	color: '#123456'
}
*/

/**
 * @name create
 * @param {object} req Object with values for filename, value, and color.
 * @function
 * @returns {payload}
 * @example
 * // Create a qrcode for heartyjessman.
 * create({name:'heartyjessman.png', value:'heartyjessman'})
 * @todo Figure out why color doesn't seem to work.
 */
module.exports = async (req) => {

	let payload = payload_obj()
	
	payload.name = req.name
	payload.value = req.value
	payload.path = `./data/cache/qrcodes/${payload.name}`

	// IF QRCODE FILE DOES NOT EXIST, CREATE IT.
	if(!fs.existsSync(payload.path)){

		payload.qrcode = await QRCode.toFile(payload.path, payload.value, {
			color: payload.color || {dark: '#000', light: '#eee'},
			width: payload.width || 300
		})

	}
	
	return payload

}