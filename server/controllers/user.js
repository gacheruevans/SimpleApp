'use strict'
//Lib import
const jwt = require('jsonwebtoken');

//Model imports
const User= require('../models').Users;
const Notes = require('../models').Notes;

//Config import
const config = require('../config/config');

module.exports = {
    //Fetch all users by [Decoded token user id] - Administrator Functionality
    list(req, res) {
        let  token = req.headers['x-access-token'];
        if (!token){
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        } 
        jwt.verify(token, config.keySecrete, (err, decoded) => {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            if(decoded.id == 0) {
                return User
                .all()
                .then(user => res.status(200).send(user))
                .catch(error => res.status(400).send(error));
            }
        });    
    },

    //Find notes by [Decoded token user id]
    retrieve(req, res) {
        let  token = req.headers['x-access-token'];
        if (!token){
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        } 
        jwt.verify(token, config.keySecrete, (err, decoded) => {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }

            if(decoded) {
            //Find notes based on decoded id from generated token string
             return User
             .findById(decoded.id, { password: 0 }, {
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
        }); 
    },

    //Update user details by [Decoded token user id]
    update(req, res) {
        let  token = req.headers['x-access-token'];
        if (!token){
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        } 
        jwt.verify(token, config.keySecrete, (err, decoded) => {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }

            if(decoded) {
                //Find note based on decoded id from generated token string             
                return User
                .findById(decoded.id, {
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
                    return user
                    .update({
                        password: req.body.password || user.password
                    })
                    .then(()=> res.status(200).send(user))
                    .catch(error => res.status(400).send(error));
                })
                .catch(error => res.status(400).send(error));
            }
        }); 
    },

    //Delete user record and all subsequent notes - Administrator Functionality
    destroy(req, res) {
        let  token = req.headers['x-access-token'];
        if (!token){
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        } 
        jwt.verify(token, config.keySecrete, (err, decoded) => {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }

            if(decoded) {
                //find note based on decoded id from generated token string             
                return User
                .findById(decoded.id, {
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
            }
        }); 
    },
};