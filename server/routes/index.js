'use strict'
const notesController = require('../controllers').notes;

module.exports = (app) => {
    app.get('/api', (req,res) => res.status(200).send({
        message: 'welcome to Notes Application'
    }));

    app.post('/api/notes', notesController.create);
    app.get('/api/notes', notesController.list);
    
};