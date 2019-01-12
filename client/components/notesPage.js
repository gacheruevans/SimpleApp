"use strict"
//libs
import React, { Component } from "react";
import { HashRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

//Component imports
import CreateNote from "./forms/createNoteForm";
import EditNote from "./forms/editNoteForm";
import Login from "./forms/loginForm";

//Styles
import "./style.scss";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
             
            editButton: false,
            createButton: false,
            logOut: false,
            usersId: '47',
            noteId:'',
            users: []
         };
         this.deleteNote = this.deleteNote.bind(this);
         this.editNote = this.editNote.bind(this);
         this.createNote = this.createNote.bind(this);
         this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        let userId = this.state.usersId;
        let header = { 
            headers: {'Content-Type': undefined }
        };
        axios.get('http://localhost:3000/api/notes/users/'+ userId , header)
            .then(res => {
                this.setState({ users: res.data });
            })
    }

    createNote(e) {
        e.preventDefault();
        //Set new state of to true
        this.setState({
            createButton: true
        });
    }

    editNote(e) {
        e.preventDefault();
        //Set new state of to true
        this.setState({
            editButton: true
        });
    }

    deleteNote(e) {
        e.preventDefault();

        //Get value and set state with new value passed in values attribute in form
        this.setState({
            noteId: e.target.value
        });

        const userId = this.state.usersId;
        const noteId = this.state.noteId;

        if(noteId){
            alert("Are you sure you want to delete the note?");

            //Connection to backend api
            axios.delete('http://localhost:3000/api/notes/users/'+userId+'/note/'+noteId)
            .then(res => {
                this.setState({ users: res.data });
            })

            //After post of data / deletion of note clear the state of noteId
            this.setState({
                noteId: ''
            }); 
        }else{
            alert("Something went wrong");
        }
    }

    signOut(e) {

        //Connection to backend api
        axios.delete('http://localhost:3000/api/notes/users/'+userId+'/logout')
        .then(res => {
            this.setState({ users: res.data });
        })
        
        this.setState({
            logOut: true
        });
    }

    render() {
        //Loop through noteItem object to get notes.
        const items= this.state.users.noteItems;
        let getItems = () => {
            const items= this.state.users.noteItems;
            return Object.values(items).map((x,key) => {
               return( 
                <div key={key} className="list-items">
                    <div className="note-body">
                        <div className="note-title">
                            <div>{Object.values(x).slice(1,-4)}</div>
                        </div>
                        <div className="note-row">
                            <div>{Object.values(x).slice(2,-3)}</div>
                        </div>
                        <div className="note-row">
                            <button type="submit" value={Object.values(x).slice(0,-5)} className="editBtn" onClick={this.editNote}>Edit</button>
                            <button type="submit" id="delete" name="delete" value={Object.values(x).slice(0,-5)} className="deleteBtn" onClick={this.deleteNote}>Delete</button>
                        </div>
                    </div>
                </div>)
             });
        }

        //Checks if edit button state is true, so at to redirect the user edit form
        const editButton = this.state.editButton;
        if (editButton == true) {
            return <Router><Route editButton='/EditNote' component={EditNote}/></Router>
        }

        //Fetch Create New Note form.
        const createButton = this.state.createButton;
        if (createButton == true) {
            return <Router><Route createButton='/CreateNote' component={CreateNote}/></Router>
        }

        //Redirect back to Login.
        const logOut = this.state.logOut;
        if (logOut == true) {
            return <Router><Route logOut='/Login' component={Login}/></Router>
        }
        return (
            <div>
                <div className="logOutBtn-body">
                    <button className="logOutBtn" onClick={this.signOut}>Sign Out</button>
                </div>
                <div className="account-body">
                    <h3>{this.state.users.username} Account</h3>
                     <div className="note-card">
                        <div className="create-noteBtn-body">
                            <button className="createBtn" onClick={this.createNote}>Create+</button>
                        </div>
                        {items && getItems()}
                     </div>
                </div>
            </div>
        );
    }
}
export default Welcome;