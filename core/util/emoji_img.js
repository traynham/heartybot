/**
 * Get an image url for an emoji.
 * @module
 * @name emoji_img
 * @category Core
 * @subcategory Util
*/

const emoji = require('@data/emoji.json')
const payload_obj = require('@core/util/payload')
const obj2QueryString = require('@core/util/obj2QueryString')

/**
 * @name emoji_img
 * @see https://images.weserv.nl/docs/quick-reference.html
 * @param {string} q The name of the emoji
 * @param {object} opt Options derived from images.weserv.nl
 * @function
 * @returns {payload}
 * @example
 * // Get emoji link for "hash"
 * emoji_img('hash')
 *
 * // Get emoji link for "coffee" and use opt to set height to 25.
 * emoji_img('coffee', {h: 25})
 
 */
module.exports = (q, opt = {}) => {

	let payload = payload_obj()
	payload.info = 'https://unicodey.com/emoji-data/table.htm'

	const result = emoji.filter(word => word.short_names.includes(q));
	
	if(!result.length){
		payload.error = true
		payload.error_message = 'Emoji not found.'
		payload.q = q
		opt.url = `raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-160/2754.png`
		//console.log('ERROR: Emoji not found', payload)
	} else {
		opt.url = `raw.githubusercontent.com/iamcal/emoji-data/master/img-apple-160/${result[0].image}`
	}

	payload.value = `https://images.weserv.nl/?${obj2QueryString(opt)}`

	return payload

}