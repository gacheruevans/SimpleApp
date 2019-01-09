'use strict'
const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;

//import note model for unit testing
const Notes = require('../../models').Notes;


describe('Get all Notes', ()=> {
    //Test will pass if we get all users
    it('Should return all notes of a user', (done) => {
        let NotesMock = sinon.mock(Notes);
        let expectedResult = {status: true, notes: []};
        NotesMock.expects('find').yields(null, expectedResult);
        Notes.find((err,res) => {
            NotesMock.verify();
            NotesMock.restore();
            done();
        });
    });
    //Test will pass if we fail to get a user
    it('Should return error', (done) => {
        let NotesMock = sinon.mock(Notes);
        let expectedResult = {status: false, error: 'Something went wrong'};
        NotesMock.expects('find').yields(expectedResult, null);
        Notes.find((err, res)=> {
            NotesMock.verify();
            NotesMock.restore();
            expect(err.status).to.not.be.true;
            done();
        });
    });
});


describe('Post a new note', () => {
    //Test will pass if the note is saved
    it('should create a now note', (done) => {
        let NotesMock = sinon.mock(new Notes({ 
            title: 'new note',
            description: 'save new note from mock'
        }));
        let note = NotesMock.object;
        let expectedResult = { status: true };
        NotesMock.expects('save').yields(null, expectedResult);
        note.save((err, res) => {
            NotesMock.verify();
            NotesMock.restore();
            expect(res.status).to.be.true;
            done();
        });
    });
});