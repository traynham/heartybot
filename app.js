// UTILITIES
//const createError = require('http-errors')
const glob = require('glob');
const path = require('path')
//const fetch = require('node-fetch') // NEEDED/OUTDATED?
//const useragent = require('express-useragent')


// EXPRESS
const express = require('express')
const session = require('express-session')
const app = express();

//const cors = require('cors')
//app.use(cors())

// EXPRESS MIDDLEWARE
const bodyParser = require('body-parser')
//const isAuth = require('./middleware/is-auth')		// CHECKS req.session.isLoggedIn
//const { permit } = required('/middleware/permission')


// AUTHENTICATION
//const grant = require('grant-express')


// VIEW ENGINE SETUP
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// USE USERAGENT MIDDLEWARE
//app.use(useragent.express());


// MIDDLEWARE
app.use(
//	require('./modules/sessionManagement'),			// SESSIONS MANAGEMENT
//	require('./middleware/resLocals'),				// EXPOSE LOCALS
//	require('./middleware/user_session'),			// LOAD USER RECORD INTO SESSION
//	grant(require('./config/grant.json')),			// GRANT AUTHENTICATION
//	bodyParser.json(),								// PARSE JSON BODIES
//	bodyParser.urlencoded({ extended: true }),		// PARSE URLENCODED BODIES
	express.static(path.join(__dirname, 'public'))	// PUBLIC SERVE
)


// PUBLIC ROUTES
const publicRouter = glob.sync('./router/public/**/*.js').map(file => require( path.resolve( file ) ));
app.use('/', publicRouter)



// ADMIN ROUTES
const adminRouter = glob.sync('./router/admin/**/*.js').map(file => require( path.resolve( file ) ));
//app.use('/admin', isAuth, permit('su', 'admin', 'host', 'host+'), adminRouter)
app.use('/admin', adminRouter)


// MOVE SOMEWHERE?
	// ERRORS ARE HAVING SOME ISSUES - NEED TO RESEARCH.

/*
	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
	  next(createError(404));
	});

	// error handler
	app.use(function(err, req, res, next) {
	  // set locals, only providing error in development
	  res.locals.message = err.message;
	  res.locals.error = req.app.get('env') === 'development' ? err : {};

		//res.locals.user = 'req.session.user'
		
	  // render the error page
	  res.status(err.status || 500);
	  res.render('error');
	});
*/

module.exports = app