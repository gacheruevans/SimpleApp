'use strict'

//Lib imports
const jwt = require('jsonwebtoken');

//Config imports
const config = require('../../config/config');

module.exports = {
    //create token
    createToken() {

        // Create a token by making a payload and secrete key in config file
        let token = jwt.sign({id: user.id}, config.keySecrete, {
            expiresIn: 86400 // expires in 24hours
        });
        console.log('Token Generates from tokenGenerator >>>>>>',token);
        return token;

    },
}