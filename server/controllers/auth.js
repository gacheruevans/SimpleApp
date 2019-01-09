'use strict'
const bcrypt = require('bcrypt');
const User = require('../models').Users;

//WIP-Work in progress
module.exports = {
   register(req, res) {
       //Hashing password
        const hash = bcrypt.hashSync(req.body.password, 10);
        return User
        .create({
            username: req.body.username,
            password: hash
        })
        .then(user => res.status(201).send(user))
        .catch(error => res.status(400).send(error));
   },
};