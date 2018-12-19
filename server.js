'use strict'

const Hapi = require('hapi')
const Joi = require("joi");//used for validation

const server = new Hapi.Server({
    "host": "localhost",
    "port": 3000 
});


const init = async () => {
    await server.register(require('inert'));

    server.route({
        method: 'GET',
        path: '/home',
        handler: (request, h) => {

            return h.file('./src/index.html');
        }
    });

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();