/**
 * Checks if the message member includes a desired role.
 *
 * -----
 * @module hasRole
 * @author Jesse Traynham
 * @category Core
 * @subcategory Discord
 */

/**
 * @param {object} message A discord message object.
 * @param {string} desired_role Desired role name
 * @function
 * @name hasRole
 * @returns {boolean}
 */

module.exports = (message, desired_role) => {
	return message.member.roles.cache.some(role => role.name.toLowerCase() === desired_role.toLowerCase())
}