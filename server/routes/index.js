'use strict'
const notesController = require('../controllers').notes;
const userController = require('../controllers').user;

module.exports = (app) => {
    app.get('/api', (req,res) => res.status(200).send({
        message: 'welcome to Notes Application'
    }));

    app.post('/api/users', userController.create); //create users
    app.post('/api/users/:userId/notes', notesController.create); //User creates notes
    app.get('/api/users', userController.list); //list all users
    app.get('/api/notes/:userId' , userController.retrieve); //retrieve notes as per user id

};