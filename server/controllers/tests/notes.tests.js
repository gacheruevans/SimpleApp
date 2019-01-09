'use strict'
//import chai testing  functions
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

//import express app
const app = require('../../../server');

chai.use(chaiHttp);

describe('/POST new user', ()=> {
    it('Should create a new user', () =>{
        let newUser = {
            username: 'tester',
            password: 'pass1234'
        }

        chai.request(app)
        .post('/api/users')
        .type('form')
        .send(newUser)
        .end((err, res) => {
            expect(err).to.have.status(201);
            expect(err).to.be.undefined;
            expect(res).to.ba.an('object');
        });
    });
});
