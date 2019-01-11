"use strict"
//libs
import React, { Component } from "react";
import { HashRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

//Component imports
import CreateNote from "./forms/createNoteForm";
import EditNote from "./forms/editNoteForm";

//styles
import "./style.scss";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            editButton: false,
            usersId: '47',
            noteId:'',
            users: []
         };
         this.deleteNote = this.deleteNote.bind(this);
         this.editNote = this.editNote.bind(this);
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

        console.log("Get note Id >>>>", noteId);

        if(noteId){
            alert("Are you sure you want to delete the note?");

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
    render() {
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

        return (
            <div>
                <div className="account-body">
                    <h3>{this.state.users.username} Account</h3>
                     <div className="note-card">
                        {items && getItems()}
                     </div>
                </div>
            </div>
        );
    }
}
export default Welcome;