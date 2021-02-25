require('module-alias/register')

const fs = require('fs');

console.log('So far so good?')

const file = require('../core/util/file')

file.createFile('data/cache/pokemongo/pokedex.json', '{}', {overwrite: false})
file.createFile('data/cache/pokemongo/bosses.json', '{}', {overwrite: false})
file.createFile('data/cache/raids.json', '{}', {overwrite: false})
file.createFile('data/private/guilds.json', '{}', {overwrite: false})

const { pokedex, util} = require('@core')
const config = require('@config')

// INITIALIZE SQUELIZE AND DEFINE MODELS
const sequelize = require('../util/sequelize.js')

require('../models/gyms.js')
require('../models/areas.js')
require('../models/members.js')

sequelize
.sync()
.then(result => {console.log('Squelize initialized.')})
.catch(err => {console.log(err)})

pokedex.update()
util.update_bosses()

// INITIALIZE LOWDB
//require('@models_lowdb/bosses.js')
//require('@models_lowdb/raids.js')

//console.log(config)
console.log('Hearty Setup complete')




// NEED TO FIGURE OUT PRIVATE/GUILDS.JSON
// NEED TO POPULATE TEST GYM?


