const Notes = require('../models').Notes;

module.exports = {
    //create note function
    create(req, res) {
        return Notes
        .create({
            title: req.body.title,
            description: req.body.description
        })
        .then(notes => res.status(201).send(notes))
        .catch(error => res.status(400).send(error));
    },
    //List all notes function
    list(req, res) {
        return Notes
        .all()
        .then(notes => res.status(200).send(notes))
        .catch(error => res.status(400).send(error));
    },
};