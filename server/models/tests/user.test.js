'use strict'
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

//import note model for unit testing
const Users = require('../../models').Users;
const Notes = require('../../models').Notes;


describe('Get all Notes By Id', ()=> {
    //Test will pass if we get all user notes
    it('Should return all notes of a user by Id', (done) => {
        let NotesMock = sinon.mock(Users);
        let expectedResult = {status: true, id: 1 ,username:'', noteItems: []};
        NotesMock.expects('find').withArgs({id: 23451}).yields(null, expectedResult);
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


describe('Post a new note', () => {
    //Test will pass if the note created by user is saved
    it('should create a new note by user', (done) => {
        let NotesMock = sinon.mock(new Notes({ 
            title: 'new note',
            description: 'save new note from mock'
        }));
        let note = NotesMock.object;
        let expectedResult = { status: true };
        NotesMock.expects('save').withArgs({_id: 23451}).yields(null, expectedResult);
        note.save((err, res) => {
            NotesMock.verify();
            NotesMock.restore();
            expect(res.status).to.be.true;
            done();
        });
    });
    //Test will pass if the note is not saved with user id
    it('should return error, if post not saved with user id', (done) => {
        let NotesMock = sinon.mock(new Notes({
            title: 'new note',
            description: 'save new note from mock'
        }));
        let note = NotesMock.object;
        let expectedResult = { status: false };
        NotesMock.expects('save').withArgs({_id: null}).yields(expectedResult, null);
        note.save((err, res) => {
            NotesMock.verify();
            NotesMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});

describe('Update a note by id', () => {
    //Test will pass if note is updated based on Id
    it('should update a note by id', (done) => {
        let NotesMock = sinon.mock(new Notes({title: 'update'}));
        let note = NotesMock.object;
        let expectedResult = { status: true };
        NotesMock.expects('save').once().withArgs({_id: 23451});
        note.save((err, res) => {
            NotesMock.verify();
            NotesMock.restore();
            expect(res.status).to.be.true;
            done();
        });
    });

});