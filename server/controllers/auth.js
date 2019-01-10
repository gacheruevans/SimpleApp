'use strict'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const User = require('../models').Users;

//WIP-Work in progress
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
            let token = jwt.sign({id: user._id}, config.secret, {
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
       //Check if user exists
       User.findOne({username: req.body.username}, (err, user) => {
           if (err) {
                return res.status(500).send('Error on the server.');
           }
           if (!user) {
                return res.status(404).send('No user found.');
           }
           //Compare whether hashed passwords match 
           let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
           if (!passwordIsValid) {
               return res.status(401).send({
                   auth: false,
                   token: null
               });
           }

           let token = jwt.sign({id: user._id}, config.secret, {
                expiresIn: 86400 // expires in 24hours
           });
           res.status(200).send({ auth: true, token: token });
       }); 
   }

};