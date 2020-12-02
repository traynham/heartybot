/**
 * Find a trainer record.
 * @module
 * @name me › findOrCreate
 * @category Core
 * @subcategory Me
*/


const Members = require('@models/members')
const payload_obj = require('@core/util/payload')

/**
 * @name findOrCreate
 * @param {discord_user} user Should be a discord user object, or mimic one. Record is found using snowflake field.
 * @function
 * @returns {payload}
 * @example
 * findOrCreate({
	 id: 'snowflake',
	 username: 'heartyjessman',
	 discriminator: '1926'
 })
 */

module.exports = async (user) => {

	let payload = payload_obj()

	let [result, created] = await Members.findOrCreate(
		{
			where: {snowflake: user.id},
			defaults: {
				nickname: user.username,
				nickname_discriminator: user.discriminator
			}
		}
	)

	payload.value = result
	payload.created = created

	return payload

}