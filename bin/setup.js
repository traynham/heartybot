require('module-alias/register')

console.log('So far so good?')

const file = require('../core/util/file')

file.createFile('data/cache/pokemongo/pokedex.json', '{}', {overwrite: false})
file.createFile('data/cache/pokemongo/bosses.json', '{}', {overwrite: false})
file.createFile('data/cache/raids.json', '{}', {overwrite: false})
file.createFile('data/private/guilds.json', '[]', {overwrite: false})

file.createDir('data/cache/qrcodes')

const { pokedex, util} = require('@core')

// INITIALIZE SQUELIZE AND DEFINE MODELS
const sequelize = require('../util/sequelize.js')

require('../models/gyms.js')
require('../models/areas.js')
require('../models/members.js')

sequelize
.sync()
//.then(result => {console.log('Squelize initialized.')})
.then( () => {console.log('Squelize initialized.')})
.catch(err => {console.log(err)})

pokedex.update()
util.update_bosses()

console.log('Hearty Setup complete')




// NEED TO POPULATE TEST GYM?
// ADD HEARTYTESTMAN MEMBER

// FIX ALL TESTS -- POSSIBLY DO A LIGHT AND A HEAVY TEST
//   ONE FOR MORE THOROUGH TESTING.
//   POSSIBLY PASS AN ENV VAR TO DETECT WHAT TO RUN.