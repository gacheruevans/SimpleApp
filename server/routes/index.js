'use strict'
const authController = require('../controllers').auth;
const notesController = require('../controllers').notes;
const userController = require('../controllers').user;

module.exports = (app) => {
    app.get('/api/notes', (req,res) => res.status(200).send({
        message: 'welcome to Notes Application please login'
    }));

    app.post('/api/notes/register', authController.register); //register users
    app.post('/api/notes/login', authController.login); //login of users

    app.get('/api/notes/users', userController.list); //list all users
    app.get('/api/notes/users/:userId', userController.retrieve); //list a specific user and his/her details
    app.put('/api/notes/users/:userId', userController.update); //Updates user details
    app.delete('/api/notes/users/:userId', userController.destroy); //Delete User record which delete any subsequent notes in it.

    app.post('/api/notes/users/:userId/note', notesController.create); //User creates notes
    app.get('/api/notes/users/:userId/note', userController.retrieve); //Retrieve notes as per user id
    app.put('/api/notes/users/:userId/note/:notesId',  notesController.update); //Update a note owned by the user, using his user id
    app.delete('/api/notes/users/:userId/note/:notesId', notesController.destroy); //delete a note specific note, owned by the exclusive user [userId][noteId] 

};