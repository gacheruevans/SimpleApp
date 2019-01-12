'use strict'
// Lib imports
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Config imports
const config = require('../config/config');

// Model imports
const User = require('../models').Users;


module.exports = {
   register(req, res) {
        //Hashing password using bcrypt
        const hashedPassword = bcrypt.hashSync(req.body.password, 8);
        User.create({
            username : req.body.username,
            password: hashedPassword
        })
        .then( user => {
            // Create a token by making a payload and secrete key in config file
            let token = jwt.sign({id: user.id}, config.keySecrete, {
                expiresIn: 86400 // expires in 24hours
            });
            res.status(200).send({ auth: true, token: token});
            res.status(201).send(user);
        })
        .catch(error => res.status(400).send({
            error: 'Something went wrong!'
        }))
   },
   login(req, res) {
       //Check if user exists using username variable holding the posted username data
       User.findOne({ where: { username: req.body.username } })
        .then( user => {
           //If no user record is found redirect to login page
           if (!user) {
                return res.status(404).send('No user found.');
           }
           //Compare whether the hashed passwords match 
           let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
           if (!passwordIsValid) {
               return res.status(401).send({
                   auth: false,
                   token: null
               });
           }

           let token = jwt.sign({ id: user.id }, config.keySecrete, {
                expiresIn: 86400 // expires in 24hours
           });
           return res.status(200).send({ auth: true, token: token });
       })
       .catch(error => res.status(400).send({
            error: 'Something went wrong!'
        }));
   },
   logout(req, res) {
        //Logout user
        User.logout((err, user) => {
            if (err) {
                return res.status(500).send('Error on the server.');
           }
           if (!user) {
                return res.status(404).send('No user found.');
           }
           let token = null;
           return res.status(200).send({ auth: false, token: token });
        });
   }

};