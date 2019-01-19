'use strict'
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

//Jwt import
const jwt = require('jsonwebtoken');

//Express app import
const app = require('../../../server');

//Config import
const config = require('../../config/config');

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

    it('Should fetch user detials by id with token', (done) =>{
        let User = {
            id: '1',
            username: 'tester@test.com'
        }

        // Create a token by making a payload and secrete key in config file
        let token = jwt.sign({id: User.id}, config.keySecrete, {
            expiresIn: 86400 // expires in 24hours
        })

        chai.request(app)
        .get('/api/notes/users/'+User.id, {headers: token})
        .send(User)
        .end((err, res) => {
            expect(res).to.have.status(200);
        });
        done();
    });

    it('Should allow user to edit their details with token', (done) =>{
        let User = {
            id: '1',
            username: 'tester@test.com'
        }

         // Create a token by making a payload and secrete key in config file
         let token = jwt.sign({id: User.id}, config.keySecrete, {
            expiresIn: 86400 // expires in 24hours
        })

        chai.request(app)
        .put('/api/notes/users/'+User.id, {headers: token})
        .send(User)
        .end((err, res) => {
            expect(res).to.have.status(204);
        });
        done();
    });
});
