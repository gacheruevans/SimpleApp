'use strict'

//Lib imports
const jwt = require('jsonwebtoken');

//Config imports
const config = require('../../config/config');

module.exports = {
    //create token
    verifyToken() {
        jwt.verify(token, config.keySecrete, function(err, decoded) {
            if (err) {
                return res.status(500).send(
                    { auth: false, message: 'Failed to authenticate token.' }
                );
            }// If everything is good, clear token session ans auth
            let token = null;
            return res.status(200).send({ auth: false, token: token });
             
        });
    },
}