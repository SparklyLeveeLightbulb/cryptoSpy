// setup =======================
var express = require('express');
var app = express();
var port = process.env.port || 8080
var connect = require('connect')
var sequelize = require('sequelize');
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDB = require('./config/database.js');

// config database here =============

  // connect to whatever cloud hosting service is hosting our mySQL
  // require('./config/passport.js')(passport);


// ==================================

// setup express ====================

app.use(morgan('dev'));
app.use(bodyParser());
app.use(cookieParser());

app.set('view engine', 'ejs'); // view engine might change with angular 2 being added


// required for passport =============

app.use(session({secret: 'relinquishedloversinrome'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes =============================

require('./app/routes.js')(app, passport);


// ====================================

// launch =============================

app.listen(port);
console.log('The magic happens on port ' + port);