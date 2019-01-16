'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

//import bcrypt & jwt for hash pass comparison
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//import secrete
const config = require('../../config/config');

//import express app
const app = require('../../../server');

chai.use(chaiHttp);

describe('Test user functions scope', ()=> {
    

    it('Should fetch users', (done) =>{
        let User = {
            username: 'tester@test.com',
            password: bcrypt.hashSync('pass1234', 8),
            createdAt: '2019-01-14 23:59:37.765+03',
            updatedAt: '2019-01-14 23:59:37.765+03'
        }

        // Create a token by making a payload and secrete key in config file
        let token = jwt.sign({id: User.id}, config.keySecrete, {
            expiresIn: 86400 // expires in 24hours
        })


        chai.request(app)
        .get('/api/notes/users/')
        .send(User, token)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.ba.an('object');
            expect(res).to.have.property('username');
            expect(res).to.have.property('createdAt');
            expect(res).to.have.property('updatedAt'); 
            expect(res).to.have.property('_id').eql(User.id);
            expect(err).to.be('error');
        });
        done();
    });
    it('Should not fetch user by id without token', (done) =>{
        let User = {
            id: 3,
            username: 'tester@test.com',
            password: bcrypt.hashSync('pass1234', 8),
            createdAt: '2019-01-14 23:59:37.765+03',
            updatedAt: '2019-01-14 23:59:37.765+03'
        }


        chai.request(app)
        .get('/api/notes/users/')
        .send(User)
        .end((err, res) => {
            expect(res).to.have.status(500);
            expect(res).to.ba.an('object');
            expect(res).to.have.property('username');
            expect(res).to.have.property('createdAt');
            expect(res).to.have.property('updatedAt'); 
            expect(res).to.have.property('_id').eql(User.id);
            expect(err).to.be('error');
        });
        done();
    });
    it('Should fetch user by id', (done) =>{
        let User = {
            id: 3,
            username: 'tester@test.com',
            password: bcrypt.hashSync('pass1234', 8),
            createdAt: '2019-01-14 23:59:37.765+03',
            updatedAt: '2019-01-14 23:59:37.765+03'
        }

        // Create a token by making a payload and secrete key in config file
        let token = jwt.sign({id: User.id}, config.keySecrete, {
            expiresIn: 86400 // expires in 24hours
        })


        chai.request(app)
        .get('/api/notes/users/')
        .send(User, token)
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res).to.ba.an('object');
            expect(res).to.have.property('username');
            expect(res).to.have.property('createdAt');
            expect(res).to.have.property('updatedAt'); 
            expect(res).to.have.property('_id').eql(User.id);
            expect(err).to.be('error');
        });
        done();
    });
});
