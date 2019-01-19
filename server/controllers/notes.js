//Lib import
const jwt = require('jsonwebtoken');

//Model import
const Notes = require('../models').Notes;

//Config import
const config = require('../config/config');

module.exports = {
    //Create a new note by [Decoded token user id]
    create(req, res) {
        let  token = req.headers['x-access-token'];
        if (!token){
            return res.status(401).send({ auth: false, message: 'No token provided.' });
        } 

        jwt.verify(token, config.keySecrete, (err, decoded) => {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            if(decoded) {
                return Notes
                .create({
                    title: req.body.title,
                    description: req.body.description,
                    userId: decoded.id
                })
                .then(userNotes => {
                    res.status(201).send(userNotes);
                    
                })
                .catch(error => new Promise((resolve, reject) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve();

                }));
            }
        });   
    },

    //Update note by [Decoded token user id] & passed note id
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
                return Notes
                .find({
                    where: {
                        id: req.params.notesId,
                        userId: decoded.id,
                    },
                })
                .then(note => {
                    if (!note) {
                        return res.status(404).send({
                            message: 'Note Not Found'
                        });
                    }
                    return note
                    .update({
                        title: req.body.title || note.title,
                        description: req.body.description || note.description,
                    })
                    .then(updatedNote => res.status(200).send(updatedNote))
                    .catch(error => res.status(400).send(error));
                })
                .catch(error => new Promise((resolve, reject) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve();

                }));
            }
        }); 
    },
    //Delete note by [Decoded token user id] & passed note id
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
                return Notes
                .find({
                    where: {
                        id: req.params.notesId,
                        userId: decoded.id,
                    },
                })
                .then( note => {
                    if(!note) {
                        return res.status(404).send({
                            message: 'Note Not Found'
                        })
                    }
                    return note
                    .destroy()
                    .then(()=> res.status(204).send())
                    .catch(error => res.status(400).send(error));
                })
                .catch(error => new Promise((resolve, reject) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve();

                }));
            }
        });
    },
};