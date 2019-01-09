'use strict'
const authController = require('../controllers').auth;
const notesController = require('../controllers').notes;
const userController = require('../controllers').user;

module.exports = (app) => {
    app.get('/api', (req,res) => res.status(200).send({
        message: 'welcome to Notes Application'
    }));

    app.post('/api/register', authController.register); //register users

    app.get('/api/users', userController.list); //list all users
    app.get('/api/users/:userId', userController.retrieve); //list a specific user and his/her details
    app.put('/api/users/:userId', userController.update); //Updates user details
    app.delete('/api/users/:userId', userController.destroy); //Delete User record which delete any subsequent notes in it.

    app.post('/api/users/:userId/notes', notesController.create); //User creates notes
    app.get('/api/users/:userId/notes', userController.retrieve); //Retrieve notes as per user id
    app.put('/api/users/:userId/notes/:notesId',  notesController.update); //Update a note owned by the user, using his user id
    app.delete('/api/users/:userId/notes/:notesId', notesController.destroy); //delete a note specific note, owned by the exclusive user [userId][noteId] 

};