// https://nodejs.dev/learn/writing-files-with-nodejs
// Paths are from root of process


const fs = require('fs')
const Path = require('path')

const createDir =  dirPath => {
	
	fs.mkdirSync(process.cwd() + dirPath, { recursive: true }, (error) => {
	
		if (error) {
			console.log('An error occourred: ', error)
		} else {
			console.log('Directory made.')
		}
		
	})
	
}

const createFile = (path, data) => {
	
	// CREATE DIR IF NEEDED
	if(!fs.existsSync(process.cwd() + Path.dirname(path))){
		createDir(Path.dirname(path))
	}
	
	// STRINGIFY TO JSON IF OBJECT
	if(typeof data === "object") {
		data = JSON.stringify(data, null, 2)
	}

	// WRITE FILE
	try {
		fs.writeFileSync(process.cwd() + path, data)
	} catch (err) {
		console.error(err)
	}
	
}


module.exports = {
	createDir: createDir,
	createFile: createFile
}