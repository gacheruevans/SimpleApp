'use strict'
const jwt = require('jsonwebtoken');
const User= require('../models').Users;
const Notes = require('../models').Notes;
const config = require('../config/config');

module.exports = {
    //fetch all users - function for an Administrator
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

    //find notes by user id
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
            //find notes based on decoded id from generated token string
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
                    });
                }
                return res.status(200).send(user)
            })
            .catch(error => res.status(400).send(error));
            }
        }); 
    },
    //update user details
    update(req, res) {
        return User
        .findById(req.params.userId, {
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
    },
    //delete user record and all subsequent notes
    destroy(req, res) {
        return User
        .findById(req.params.userId, {
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
};