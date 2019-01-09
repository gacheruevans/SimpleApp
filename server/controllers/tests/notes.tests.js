'use strict'
//import chai testing  functions
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

//import express app
const app = require('../../../server');

chai.use(chaiHttp);

describe('User Test functionality', ()=> {
    it('Should create a new user', () =>{
        let newUser = {
            usernaem: 'tester',
            passwprd: 'pass1234'
        }

        chai.request(app)
        .post('/api/users')
        .type('form')
        .send(newUser)
        .end((err, res) => {
            expect(err).to.be.null;
            expect(res).to.have.status(201);
        });
    });
});
