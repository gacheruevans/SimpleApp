'use strict'
const notesController = require('../controllers').notes;
const userController = require('../controllers').user;

module.exports = (app) => {
    app.get('/api', (req,res) => res.status(200).send({
        message: 'welcome to Notes Application'
    }));

    app.post('/api/users', userController.create); //Create users
    app.get('/api/users', userController.list); //list all users

    app.put('/api/users/:userId', userController.update); //Updates user details

    app.post('/api/users/:userId/notes', notesController.create); //User creates notes
    app.get('/api/users/:userId/notes', userController.retrieve); //Retrieve notes as per user id
    app.put('/api/users/:userId/notes/:noteId',  notesController.update); //Update a note owned by the user, using his user id

};