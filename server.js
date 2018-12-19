'use strict'

const Hapi = require('hapi')

const server = new Hapi.Server({
    "host": "localhost",
    "port": 3000 
});

server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {

        return 'Welcome to the Server Side of the Simple Application!';
    }
});

const init = async () => {

    await server.start();
    console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();