
// iniitalizing dependency variables
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
var helmet = require('helmet');
require('dotenv').load();

// iniitalizing app
var app = express();

// defining routes
var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// stylesheet setup
app.use("/stylesheets", express.static(__dirname + "/public/stylesheets"));

// javascript setup
app.use("/javascripts", express.static(__dirname + "/public/javascripts"));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// setting routes
app.use('/', routes);
app.use('/users', users);
app.use('/login', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.json({ error: error.message });
});

var server = app.listen(3000, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('App is listening on http://%s:%s', host, port);
});
