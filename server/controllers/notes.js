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
    //update note functionality
    update(res, req) {
        return Notes
        .find({
            where: {
                id: req.params.noteId,
                userId: req.params.userId,
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
        .catch(error => res.status(400).send(error));
    },
    //delete note functionality
    destroy(res, req) {
        return Notes
        .find({
            where: {
                id: req.params.noteId,
                userId: req.params.userId,
            },
        })
        .then(note => {
            if(!note){
                return res.status(404).send({
                    message: 'Note Not Found'
                });
            }
            return note
            .destroy()
            .then(()=> res.status(204).send())
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
    }
};