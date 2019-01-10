'use strict'
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

//import express app
const app = require('../../../server');

chai.use(chaiHttp);

describe('Test user functions scope', ()=> {
    it('Should create a new user', () =>{
        let newUser = {
            username: 'tester',
            password: 'pass1234'
        }

        chai.request(app)
        .post('/api/notes/register')
        .type('form')
        .send(newUser)
        .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res).to.be.undefined;
            expect(res).to.ba.an('object');
        });
    });
    it('Should fetch all current users', () =>{

        chai.request(app)
        .get('/api/notes/users')
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.be.undefined;
            expect(res).to.ba.an('object');
        });
    });
    it('Should fetch user details base on id', () =>{
        let User = {
            id: 1,
            username: 'tester',
            password: 'pass1234'
        }

        chai.request(app)
        .get('/api/notes/users/'+User.id)
        .end((err, res) => {
            expect(err).to.have.status(200);
            expect(res).to.ba.an('object');
        });
    });
});
