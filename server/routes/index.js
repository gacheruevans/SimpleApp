'use strict'
const notesController = require('../controllers').notes;
const userController = require('../controllers').user;

module.exports = (app) => {
    app.get('/api', (req,res) => res.status(200).send({
        message: 'welcome to Notes Application'
    }));

    app.post('/api/notes', notesController.create); //create notes
    app.get('/api/notes', notesController.list); // list all notes in api

    app.post('/api/user', userController.create); //create users
    app.get('/api/users', userController.list); //list all users
    app.get('/api/notes/:userId' , userController.retrieve); //retrieve notes as per user id

};