/**
 * File/Dir Functions
 * @module
 * @name File Functions
 * @category Core
 * @subcategory Util
 * @see https://nodejs.dev/learn/writing-files-with-nodejs
 * @todo Figure out how to run fail tests.
*/

// Paths are from root of process


const fs = require('fs')
const Path = require('path')
const payload_obj = require('@core/util/payload')


/**
 * @name createDir
 * @param {string} dirPath The path to create starting at process root.
 * @function
 * @example
 * // Create "test" folder
 * createDir('test')
 */
const createDir = dirPath => {

	let payload = payload_obj()
	let fullPath = Path.join(process.cwd(), dirPath)

	fs.mkdirSync(fullPath, { recursive: true })
	
	if(!fs.existsSync(fullPath)) {
		payload.error = true
		payload.error_message = "mkdirSync error."
	}

	return payload

}

/**
 * @name createFile
 * @param {string} path The path including filename starting at process root.
 * @param {object} data The file data as an object.
 * @param {object} opt.overwrite Boolean to overwrite the file or not.
 * @function
 * @example
 * // Create file "test.json" in "test" folder.
 * file.createFile('test/test.json', {'test':'testing'})
 *
 * // Create file "another_test.json" in "test/blah" folder.
 * file.createFile('test/blah/another_test.json', {'test':'blah'}) 
 */
const createFile = (path, data, opt = {}) => {
	
	let payload = payload_obj()
	
	payload.fileExists = fs.existsSync(Path.join(process.cwd(), path))
	payload.overwrite = opt.overwrite === false ? false : true //OVERWRITE BY DEFAULT

	// CREATE DIR IF NEEDED
	if(!fs.existsSync(Path.join(process.cwd() + Path.dirname(path)))){
		createDir(Path.dirname(path))
	}

	// STRINGIFY TO JSON IF OBJECT
	if(typeof data === "object") {
		data = JSON.stringify(data, null, 2)
	}

	// WRITE FILE
	try {
		if(!payload.fileExists || payload.overwrite){
			fs.writeFileSync(Path.join(process.cwd(), path), data)
		}
	} catch (err) {
		payload.error = true
		payload.error_message = err
	}
	
	return payload
	
}


module.exports = {
	createDir: createDir,
	createFile: createFile
}