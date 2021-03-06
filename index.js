var express = require('express');

var session = require('express-session');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');


var app = express();
//Minden ami static mappaba van az kivulrol elerheto mint fajl
app.use('/static/',express.static('static'));

app.set('view engine', 'ejs');

///TODO
//Egy session megadva
app.use(session({
	secret: 'keyboard cat',
	cookie: {
	  maxAge: 60000
	},
	resave: true,
	saveUninitialized: false
  }));
/**
 * Parse parameters in POST
 */
// for parsing application/json
app.use(cookieParser());
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));

//on resource objects + data
app.use(function (req, res, next) {
	res.tpl = {};
	res.tpl.error = [];
  
	return next(); //Need to call next to move to the next middleware
});


require('./routes/routes')(app);

/**
 * Standard error handler
 */
app.use(function (err, req, res, next) {
	//res.status(500).send('Houston, we have a problem!');
  
	//Flush out the stack to the console
	console.error(err.stack);
});

//var createTestData = require('./config/testData');
//createTestData();

var server = app.listen(3000, function () {
	console.log("Server ON: 3000");
});