'use strict'
//Lib import
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//Model imports
const User= require('../models').Users;
const Notes = require('../models').Notes;

//Config import
const config = require('../config/config');



module.exports = {
    
    //Fetch all users by [Decoded token user id] - Administrator Functionality
    list(req, res) {
        let token = req.headers['x-access-token'];
        if (!token) {
           res.status(403).send(
               { auth: false, message: 'No token provided.'}
           );
        }
       jwt.verify(token, config.keySecrete, function(err, decoded) {
           if (err) {
               return res.status(500).send(
                   { auth: false, message: 'Failed to authenticate token.' }
               );
           }
           // If everything good, save to request for use in other routes
           req.userId = decoded.id;
            if(req.userId == 0) {
                return User
                .all()
                .then(user => res.status(200).send(user))
                .catch(error => res.status(400).send(error));
            }  
        });
    },
    //Fetch user notes and details
    retrieve(req, res) {
        let token = req.headers['x-access-token'];
        if (!token) {
           res.status(403).send(
               { auth: false, message: 'No token provided.'}
           );
        }
       jwt.verify(token, config.keySecrete, function(err, decoded) {
           if (err) {
               return res.status(500).send(
                   { auth: false, message: 'Failed to authenticate token.' }
               );
           }
           // If everything good, save to request for use in other routes
           req.userId = decoded.id;

            //Find notes by [Decoded token user id]
                if(req.userId){
                    return User
                    .findById(req.userId, {
                        include: [{
                            model: Notes,
                            as: 'noteItems'
                        }],
                    })
                    .then(user => {
                        if(!user) {
                            return res.status(404).send({
                                message: 'User Not Found'
                            });
                        }
                        return res.status(200).send(user)
                    })
                    .catch(error => res.status(400).send(error));
                }
                res.status(400).send({
                    message: 'Decoded token id not retrieved'
                })
       });
    },

    //Update user details by [Decoded token user id]
    update(req, res) {
        let token = req.headers['x-access-token'];
        if (!token) {
           res.status(403).send(
               { auth: false, message: 'No token provided.'}
           );
        }
       jwt.verify(token, config.keySecrete, function(err, decoded) {
           if (err) {
               return res.status(500).send(
                   { auth: false, message: 'Failed to authenticate token.' }
               );
           }
           // If everything good, save to request for use in other routes
           req.userId = decoded.id;

            //Find note based on decoded id from generated token string             
            return User
            .findById(req.userId, {
                include: [{
                    model: Notes,
                    as: 'noteItems'
                }],
            })
            .then(user => {
                if(!user) {
                    return res.status(404).send({
                        message: 'User Not Found'
                    })
                }
                //Hashing new password using bcrypt
                const hashedPassword = bcrypt.hashSync(req.body.password, 8);
                return user
                .update({
                    password: hashedPassword || user.password
                })
                .then(()=> res.status(200).send(user))
                .catch(error => res.status(400).send(error));
            })
            .catch(error => res.status(400).send(error));
        });
    },

    //Delete user record and all subsequent notes - Administrator Functionality
    destroy(req, res) {
        let token = req.headers['x-access-token'];
        if (!token) {
           res.status(403).send(
               { auth: false, message: 'No token provided.'}
           );
        }
       jwt.verify(token, config.keySecrete, function(err, decoded) {
           if (err) {
               return res.status(500).send(
                   { auth: false, message: 'Failed to authenticate token.' }
               );
           }
           // If everything good, save to request for use in other routes
           req.userId = decoded.id;

            //find note based on decoded id from generated token string             
            return User
            .findById(req.userId, {
                include: [{
                    model: Notes,
                    as: 'noteItems'
                }]
            })
            .then( user => {
                if(!user) {
                    return res.status(404).send({
                        message: 'User Not Found'
                    })
                }
                return user
                .destroy()
                .then(()=> res.status(204).send())
                .catch(error => res.status(400).send(error));
            })
        });
    },
};