const Notes = require('../models').Notes;

module.exports = {
    //create note function
    create(req, res) {
        return Notes
        .create({
            title: req.body.title,
            description: req.body.description,
            userId: req.params.userId
        })
        .then(userNotes => res.status(201).send(userNotes))
        .catch(error => res.status(400).send(error));
    },
};