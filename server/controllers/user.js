'use strict'
const User= require('../models').Users;
const Notes = require('../models').Notes;

module.exports = {
    //create user
    create(req, res) {
        return User
        .create({
            username: req.body.username,
            password: req.body.password
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
    },
    //fetch all users
    list(req, res) {
        return User
        .all()
        .then(users => res.status(200).send(users))
        .catch(error => res.status(400).send(error));
    },
    //list all notes of every user 
    list(req, res) {
        return User
        .findAll({
            include: [{
                model: Notes,
                as: 'Notes'
            }],
        })
        .then(users => res.status(200).send(users))
        .catch(error => res.status(200).send(error));
    },
    //find notes by user id
    retrieve(req, res) {
        return User
        .findById(req.params.userId, {
            include: [{
                model: Notes,
                as: 'Notes'
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
    },
};