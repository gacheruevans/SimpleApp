'use strict'
const customAuthMiddleware = require('./server/middleware/auth-middleware');//handles authentication
const cookieParser = require('cookie-parser');

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//set up express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false,}));

//Cookie-parser to help with auth token
app.use(cookieParser());
app.use(customAuthMiddleware);

// Require our routes into the application.
require('./server/routes')(app);

app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to a simple application.',
}));

//export express app for tests and also port config
module.exports = app;