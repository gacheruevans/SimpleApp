'use strict'
const bcrypt = require('bcrypt');
const User = require('../models').Users;

//WIP-Work in progress
module.exports = {
   register(req, res) {
       //Hashing password
        const hash = bcrypt.hashSync(req.body.password, 10);
        try {
            // create a new user with the password hash from bcrypt
            let user = User.create(
              Object.assign(req.body, {password: hash })
            );
        
            // data will be an object with the user and it's authToken
            let data = user.authorize();
        
            // send back the new user and auth token to the
            // client { user, authToken }
            return res.json(data);
        
          } catch(err) {
            return res.status(400).send(err);
          }
   },
   login(req, res) {
        const { username, password } = req.body;

        // Checks if the username / password is missing, 
        if (!username || !password) {

            return res.status(400).send(
                'Request missing username or password param'
            );
        }
    
        try {
            let user = User.authenticate(username, password)
        
            user = user.authorize();
        
            return res.json(user);
    
        } catch (err) {
            return res.status(400).send('invalid username or password');
        }
   }

};