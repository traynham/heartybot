/**
 * Find a trainer record.
 * @module
 * @name me › set
 * @category Core
 * @subcategory Me
*/


const Members = require('@models/members')

/**
 * @name set
 * @param {string} id The Member id (ID field in DB.)
 * @param {object} data Object of field names and values to update.
 * @function
 * @returns {number} Returns number of affected records
 * @todo Consider using snowflake for find method?
 * @example
 * set('209016296552136704', {
	 level: '40',
	 team: 'Valor'
 })
 */

module.exports = async (id, data) => {

	let result = await Members.update(
		data,
		{returning: true, plain: true, where: {id: id} }
	)

	return result[1]

}