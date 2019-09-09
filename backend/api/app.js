var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var eventsRouter = require('./routes/events');
var observationRouter = require('./routes/observations');


const errors = require('./errors/errors');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/events', eventsRouter);
app.use('/observations', observationRouter);

// errors
app.use(errors.databaseError);
app.use(errors.emptyResultError);
app.use(errors.validationError);
app.use(errors.notFound);
app.use(errors.internalServerError);

module.exports = app;
