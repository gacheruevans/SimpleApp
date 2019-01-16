'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

//import express app
const app = require('../../../server');

chai.use(chaiHttp);

describe('Test auth functions scope', ()=> {
    it('Should create a new user', (done) =>{
        let newUser = {
            username: 'tester@test.com',
            password: 'pass1234'
        }

        chai.request(app)
        .post('/api/notes/register')
        .type('form')
        .send(newUser)
        .end((err, res) => {
            expect(res).to.have.status(201);
            expect(res).to.be.an('object', {message: 'User successfully registered'});
            expect(err).to.be('error');
        });
        done();
    });

    it('Should not create a new user without password', (done) =>{
        let newUser = {
            username: 'tester@test.com',
            password: ''
        }

        chai.request(app)
        .post('/api/notes/register')
        .type('form')
        .send(newUser)
        .end((err, res) => {
            expect(res).to.have.status(500);
            expect(res).to.be.an('object', {meaaseg: 'User successfully registered'});
            expect(res).to.be.an('object');
            expect(res).to.have.property('password').eql('required');
        });
        done();
    });

    it('Should login user', (done) =>{
        let User = {
            id: 2,
            username: 'tester@test.com',
            password: 'pass1234'
        }

        chai.request(app)
        .post('/api/notes/login')
        .type('form')
        .send(User)
        .end(res => {
            expect(res).to.have.status(200);
            expect(res.data.auth).to.be.eql(true);
            expect(res).to.be.an('object');
        });
        done();
    });

    it('Should not login non-existet user', (done) =>{
        let User = {
            username: 'tester',
            password: 'pass1234'
        }

        chai.request(app)
        .post('/api/notes/login')
        .type('form')
        .send(User)
        .end((err, res) => {
            expect(res).to.have.status(400);
        });
        done();
    });
    it('Should not create a new user without username', (done) =>{
        let newUser = {
            username: '',
            password: 'pass1234'
        }

        chai.request(app)
        .post('/api/notes/register')
        .type('form')
        .send(newUser)
        .end((err, res) => {
            expect(res).to.have.status(400);
            expect(res).to.be.an('object', {meaaseg: 'User successfully registered'});
            expect(res).to.be.an('object');
            expect(res).to.have.property('username').eql('required');
        });
        done();
    });
});
