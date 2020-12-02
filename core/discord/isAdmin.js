/**
 * Checks if the message member has a role called "admin".
 *
 * -----
 * @module isAdmin
 * @author Jesse Traynham
 * @category Core
 * @subcategory Discord
 */

/**
 * @param {object} message A discord message object.
 * @function
 * @name isAdmin
 * @returns {boolean}
 */

module.exports = (message) => {
	return message.member.roles.cache.some(role => role.name.toLowerCase() === 'admin')
}