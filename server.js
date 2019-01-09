'use strict'

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//set up express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false,}));

// Require our routes into the application.
require('./server/routes')(app);

app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to a simple application.',
}));

//export express app for tests and also port config
module.exports = app;