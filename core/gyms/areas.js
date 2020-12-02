/**
 * Returns information about an area or all areas.
 *
 * -----
 * @module areas
 * @author Jesse Traynham
 * @category Core
 * @subcategory Gyms
 */

/**
 * @param {string} area A area name.
 * @function
 * @name areas
 * @returns {object}
 */

module.exports = async (area) => {

	let areas = require('@data/cache/areas.json')
		
	if(area) {	
		let theArea = Array.isArray(area) ? area.join(' ') : area
		let isArea = areas[theArea.replace(/ /g, '_').toLowerCase()]
		return isArea
	}

	return areas

}
