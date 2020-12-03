// jest.config.js
// Sync object
// https://jestjs.io/docs/en/configuration

module.exports = {
	
	verbose: true,
	
	coverageDirectory: "./jest/coverage",
	
	coveragePathIgnorePatterns: [
		"./models",
		"/node_modules/",
		"update_bosses.js",
		"/core/pokedex/update.js"
	],
	
	moduleNameMapper: {
		"@config(.*)": "<rootDir>/config$1",
		"@core(.*)": "<rootDir>/core$1",
		"@data/(.*)": "<rootDir>/data/$1",
		"@models/(.*)": "<rootDir>/models/$1",
		"@models_lowdb/(.*)": "<rootDir>/models_lowdb/$1"
	},
	
	testEnvironment: "node"

}