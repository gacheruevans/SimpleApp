'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

//import express app
const app = require('../../../server');

chai.use(chaiHttp);

describe('Test user functions scope', ()=> {
    
    it('Should not fetch users without token', (done) =>{

        chai.request(app)
        .get('/api/notes/users/')
        .end((err, res) => {
            expect(res).to.have.status(403);
        });
        done();
    });

    it('Should not fetch user by id without token', (done) =>{
        let User = {
            id: 1,
            username: 'tester@test.com'
        }

        chai.request(app)
        .get('/api/notes/users/'+User.id)
        .send(User)
        .end((err, res) => {
            expect(res).to.have.status(403);
        });
        done();
    });

    it('Should not all user to edit their details without token', (done) =>{
        let User = {
            id: 1,
            username: 'tester@test.com'
        }

        chai.request(app)
        .put('/api/notes/users/'+User.id)
        .send(User)
        .end((err, res) => {
            expect(res).to.have.status(403);
        });
        done();
    });
});
