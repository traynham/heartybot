/**
 * Find a trainer record.
 * @module
 * @name me › find
 * @category Core
 * @subcategory Me
*/


const Members = require('@models/members')

/**
 * @name find
 * @param {string|object} req A snowflake string or sequelize find object.
 * @function
 * @returns {trainer_record}
 * @example
 * // Using string
 * find('209016296552136704')
 * @example
 * // Using object
 * find({nickname:'heartytestman'})
 */
module.exports = async (req) => {

	let q = {snowflake: req}

	if (typeof req === 'object'){
		q = req
	}

	return await Members.findOne({where: q})

}