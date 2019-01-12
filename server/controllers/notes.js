const Notes = require('../models').NoteItem;

module.exports = {
    create(res, req) {
        return Notes
        .create({
            title: req.body.title,
            description: req.body.description
        }),
        console.log("title >>>>>", req.body.title)
        .then(notes => res.status(201).send(notes))
        .catch(error => res.status(400).send(error));
    },
    list(res, req) {
        return Notes
        .all()
        .then(notes => res.status(200).send(notes))
        .catch(error => res.status(400).send(error));
    }
};