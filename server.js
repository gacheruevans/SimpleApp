'use strict'
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//set up express app
const app = express();

// Import the library:
var cors = require('cors');

// Set up a whitelist and check against it to handle api cors
let whitelist = ['http://localhost:1234', 'http://localhost:8080']
var corsOptions = {
  origin:  (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
};

app.use(cors());

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
