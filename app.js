// UTILITIES
const glob = require('glob')
const path = require('path')

// EXPRESS
const express = require('express')
const app = express();

// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// MIDDLEWARE
app.use(
	express.static(path.join(__dirname, 'public'))	// PUBLIC SERVE
)

// PUBLIC ROUTES
const publicRouter = glob.sync('./router/public/**/*.js').map(file => require( path.resolve( file ) ))
app.use('/', publicRouter)

// ADMIN ROUTES › NEED TO ADD AUTHENTICATION!
const adminRouter = glob.sync('./router/admin/**/*.js').map(file => require( path.resolve( file ) ));
app.use('/admin', adminRouter)

module.exports = app