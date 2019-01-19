'use strict'
const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

//Jwt import
const jwt = require('jsonwebtoken');

//Express app import
const app = require('../../../server');

//Config import
const config = require('../../config/config');

//import note model for unit testing
const Users = require('../../models').Users;
const Notes = require('../../models').Notes;

chai.use(chaiHttp);

describe('Get all Notes By User id', ()=> {
    //Test will pass if we get all user notes
    it('Should return all notes of a user by Id', (done) => {
        let NotesMock = sinon.mock(Users);
        let expectedResult = {status: true, id: 1 ,username:'', noteItems: []};
        NotesMock.expects('find').withArgs({userId: 1}).yields(null, expectedResult);
        Notes.find((err,res) => {
            NotesMock.verify();
            NotesMock.restore();
            done();
        });
    });
    //Test will pass if we fail to get user notes
    it('Should return error', (done) => {
        let NotesMock = sinon.mock(Notes);
        let expectedResult = {status: false, error: 'Something went wrong'};
        NotesMock.expects('find').withArgs({_id: 23451}).yields(expectedResult, null);
        Notes.find((err, res)=> {
            NotesMock.verify();
            NotesMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

// describe('Test note functions', ()=> {

//     it('Should not create a new note without token', (done) =>{
//         //User mock id
//         let User = {
//             id: '1'
//         }
//         //Note details mock
//         let newNote = {
//             title: 'First Note',
//             description: 'My very first note!',
//             userId: User.id
//         }

//         // Create a token by making a payload and secrete key in config file
//         let header_token = jwt.sign({id: User.id}, config.keySecrete, {
//             expiresIn: 86400 // expires in 24hours
//         })

//         chai.request(app)
//         .post('/api/notes/users/'+User.id+'/note')
//         .type('form')
//         .send(newNote,  header_token)
//         .end( res => {
//             expect(res).to.have.status(201);
//             expect(res).to.have.property('userId').eql(User.id);
//         });
//         done();
//     });

//     it('Should not edit user note without token', (done) =>{
//         //User mock id
//         let User = {
//             id: '2'
//         }
//         //Note details mock
//         let note = {
//             _id: '1',
//             title: 'First Note - update',
//             description: 'My very first note - update!',
//             userId: User.id
//         }

//         // Create a token by making a payload and secrete key in config file
//         let header_token = jwt.sign({id: User.id}, config.keySecrete, {
//             expiresIn: 86400 // expires in 24hours
//         })

//         chai.request(app)
//         .put('/api/notes/users/'+User.id+'/note/'+note._id, header_token)
//         .type('form')
//         .send(note)
//         .end(res => {
//             expect(res).to.have.status(201);
//             expect(res).to.have.property('userId').eql(User.id);

//         });
//         done();
//     });

//     it('Should not delete user note id without token', (done) =>{
//         //User mock id
//         let User = {
//             id: '3',
//             username: 'tester@test.com'
//         }

//         //Note details mock
//         let note = {
//             _id: '4',
//             title: 'First Note',
//             description: 'My very first note!',
//             userId: User.id
//         }

//         // Create a token by making a payload and secrete key in config file
//         let header_token = jwt.sign({id: User.id}, config.keySecrete, {
//             expiresIn: 86400 // expires in 24hours
//         })

//         chai.request(app)
//         .delete('/api/notes/users/'+User.id+'/note/'+note._id, header_token)
//         .type('form')
//         .send(note)
//         .end(res => {
//             expect(res).to.have.status(204);
//             expect(res).to.have.property('userId').eql(User.id);
//         });
//         done();
//     });

// });