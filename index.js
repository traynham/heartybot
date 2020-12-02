/**
	* @file index.js Entry point
	* @author Jesse Traynham
*/

const alias = require('module-alias/register')

// INITIALIZE SQUELIZE AND DEFINE MODELS
const sequelize = require('./util/sequelize.js')
const Gyms = require('./models/gyms.js')
const Areas = require('./models/areas.js')
const Members = require('./models/members.js')

sequelize
	.sync()
	.then(result => {
		//console.log(result);
	})
	.catch(err => {
		console.log(err);
	});

// INITIALIZE BOSSES JSON.
const lowdb_bosses = require('@models_lowdb/bosses.js')


const discord = require('./discord')


var app = require('./app');
var http = require('http');
var server = http.createServer(app);

server.listen(3002);
