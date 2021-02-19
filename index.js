/**
	* @file index.js Entry point
	* @author Jesse Traynham
*/

//const alias = require('module-alias/register')
require('module-alias/register')

// INITIALIZE SQUELIZE AND DEFINE MODELS
const sequelize = require('./util/sequelize.js')

require('./models/gyms.js')
require('./models/areas.js')
require('./models/members.js')

sequelize
	.sync()
	//.then(result => {console.log(result)})
	.catch(err => {console.log(err)})

// INITIALIZE BOSSES JSON.
//require('@models_lowdb/bosses.js')

// DISCORD CLIENT
const {token} = require(`@config`).discord
const discord = require('./discord')
discord.login(token)

var app = require('./app');
var http = require('http');
var server = http.createServer(app);

server.listen(3002);
