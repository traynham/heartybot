/**
 * ## JSDOC
 * A place to put global typedefs and possibly other things.
 *
 * ## History:
 * - 10-06-20 Birth!
 *
 * -----
 *
 * @file JSDOC Items
 * @author Jesse Traynham
 * @category Config
 *
 * @todo Figure out what needs to be done with db.defaults.
 * @todo Create global def for pokemon object.
 **/
 
 /**	
 * @typedef {Object} payload
 * @global
 * @type object
 * @property {string|object} value - Payload Value
 * @property {boolean} error - Boolean error value
 * @property {string} error_message - Payload error message
 * @property {array} [rows] - Array of objects representing rows.
 * @property {number} [count] - Count of payload.rows.
*/

/**	
 * @typedef {Object} pokemon
 * @global
 * @property {string|object} value - Payload Value
 * @property {boolean} error - Boolean error value
 * @property {string} error_message - Payload error message
 * @todo DEFINE POKEMON OBJECT
*/

/**	
 * @typedef {Object} discord_user
 * @see {@link https://discord.js.org/#/docs/main/stable/class/User|Discord.js › User}
 * @global
 * @property {string} id - User ID
 * @property {string} username - User nickname
 * @property {string} discriminator - User discriminator
*/