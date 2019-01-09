'use strict'
const notesController = require('../controllers').notes;

module.exports = (app) => {
    app.get('/api', (res,req) => res.status(200).send({
        message: 'welcome to Notes Application'
    }));
    
    app.get('/api/notes', notesController.list);
    app.post('/api/notes',notesController.create);
    
};