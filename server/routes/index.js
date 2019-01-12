'use strict'
// Lib imports
const cookieParser = require('cookie-parser');
const session = require('express-session');

// Config import
const config =require('../config/config');

// Controller imports
const authController = require('../controllers').auth;
const notesController = require('../controllers').notes;
const userController = require('../controllers').user;

module.exports = (app) => {

    // Initialize cookie-parser to allow us access the cookies stored in the browser. 
    app.use(cookieParser());


    // Initialize express-session to allow us track the logged-in user across sessions.
    app.use(session({
    key: 'user_sid',
    secret: config.keySecrete,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
    }));

    // Check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
    app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
    });

    // middleware function to check for logged-in users
    let sessionChecker = (req, res, next) => {
        if (req.session.user && req.cookies.user_sid) {
            res.redirect('/dashboard');
        } else {
            next();
        }    
    };

    app.get('/api/notes', (req,res) => {
        // Middleware function to check for logged-in users
        if (req.session.user && req.cookies.user_sid) {
            res.redirect('/api/notes');
        }
        res.status(200).send({
            message: 'welcome to Notes Application please login'
        }) 
    });

    app.post('/api/notes/login', authController.login); //login of users
     
    app.post('/api/notes/register', sessionChecker, authController.register); //register users
    app.post('/api/notes/users/:userId/logout', authController.logout);//logout of users

    app.get('/api/notes/users', userController.list); //list all users
    app.get('/api/notes/users/:userId', userController.retrieve); //list a specific user and his/her details
    app.put('/api/notes/users/:userId', userController.update); //Updates user details
    app.delete('/api/notes/users/:userId', userController.destroy); //Delete User record which delete any subsequent notes in it.

    app.post('/api/notes/users/:userId/note', notesController.create); //User creates notes
    app.get('/api/notes/users/:userId/note', userController.retrieve); //Retrieve notes as per user id
    app.put('/api/notes/users/:userId/note/:notesId',  notesController.update); //Update a note owned by the user, using his user id
    app.delete('/api/notes/users/:userId/note/:notesId', notesController.destroy); //delete a note specific note, owned by the exclusive user [userId][noteId] 

};