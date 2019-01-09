'use strict'

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

//set up express app
const app = express();
const Port = 3000;

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use( bodyParser.urlencoded({ extended: false,}));

// Require our routes into the application.
require('./server/routes')(app);

app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to a simple application.',
}));

app.listen(Port, () => {
 console.log(`Server running on port ${Port}`);
});