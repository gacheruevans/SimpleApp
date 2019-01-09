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
    app.get('/api/notes/:userId' , userController.retrieve); //Retrieve notes as per user id

};