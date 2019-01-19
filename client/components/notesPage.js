"use strict"
//libs
import React, { Component } from "react";
import { HashRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import IconTabs from "../components/tabs/iconTabs";
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

//Component imports
import CreateNote from "./forms/createNoteForm";
import EditNote from "./forms/editNoteForm";
import Login from "./forms/loginForm";
import EditUserDetails from "./forms/editUserForm";

//Styles
import "./style.scss";

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: "none",
            showEdit: "none",
            showEditDetails: "none",
            top: false,
            logOut: false,
            userId: this.props.userId,
            passedAuth: this.props.Auth,
            currentToken: this.props.token,
            deleted: false,
            status: this.props.createButton,
            authState: this.props.currentAuthState,
            users: [],
            noteId: ""
         };

         this.deleteNote = this.deleteNote.bind(this);
         this.editNote = this.editNote.bind(this);
         this.createNote = this.createNote.bind(this);
         this.closeNoteForm = this.closeNoteForm.bind(this);
         this.closeEditForm = this.closeEditForm.bind(this);
         this.editDetails = this.editDetails.bind(this);
         this.closeEditDetails = this.closeEditDetails.bind(this);
         this.signOut = this.signOut.bind(this);
    }

    componentDidMount() {
        this.getRecords();
    }

    componentDidUpdate(prevProps, prevState){
       this.getRecords();
    }
   
    getRecords(){
         //Fetch user Id from login form after token has been decoded.
         let userId = this.props.userId;
        if(userId) {
            //Fetch tokenHeader that will pass token to api
            let token = this.state.currentToken;
            let headers = {
                "Content-Type" : "application/json",
                "x-access-token" : token 
            };
    
            axios.get("http://localhost:3000/api/notes/users/"+userId, {headers: headers})
                .then(res => {
                    //Fetches response data from api and sets it to users object
                    const updatedUsers = res.data;
                    this.setState({ 
                        users: updatedUsers
                    });
                });
        }
    }
    
    createNote() {
        //Set new state of to true
        this.setState({
            show: "block"
        });
    }
    closeNoteForm() {
        this.setState({
            show: "none"
        });
    }

    editNote(e) {
         //Get current value fetched from the button
         let fetchedNoteId = e.target.value;
        //Set new state of note Id
        this.setState({
            showEdit: "block",
            noteId: fetchedNoteId
        });
    }
    editDetails(e) {
        //Get current value fetched from the button
        let userId =this.state.userId
       //Set new state of note Id
       this.setState({
           showEditDetails: "block",
           userId: userId,
           top: true
       });
   }
   closeEditDetails(e) {
        //Close drawer
        this.setState({
            top: false
        });
   }
    closeEditForm() {
        this.setState({
            showEdit: "none",
            noteId: ""
        });
    }

    deleteNote(e) {
        e.preventDefault();
        //Get current value fetched from the button
        let fetchedNoteId = e.target.value;
        let userId = this.state.userId;

        if(fetchedNoteId){
            alert("Are you sure you want to delete the note?");
            //Fetch tokenHeader that will pass token to api
            let token = this.state.currentToken;
            let headers = {
                "Content-Type" : "application/json",
                "x-access-token" : token 
            };

            //Connection to backend api
            axios.delete("http://localhost:3000/api/notes/users/"+userId+"/note/"+fetchedNoteId, {headers: headers})
            .then(res => {
                const newUsersData= res.data;
                this.setState({
                    users: newUsersData,
                    deleted: true
                });
            })
            this.componentDidUpdate();

        }else{
            alert("Something went wrong");
        }
    }

    signOut(e) {

        //fetch user is from state
        let userId = this.state.userId;

        if(userId){

            alert("Are you sure you want to Sign out?");
            //Fetch tokenHeader that will pass token to api
            let token = this.state.currentToken;
            let headers = {
                "Content-Type" : "application/json",
                "x-access-token" : token 
            };
            //Fetch user id from state
            let userId = this.state.userId;
            //Connection to backend api
            axios.post("http://localhost:3000/api/notes/users/"+userId+"/logout", {headers: headers})
            .then(res => {
                console.log(res.data)
            });
            //clear states
            this.setState({ 
                logOut: true,
                userId: "",
                passedAuth: "",
                currentToken: "", 
            });
        }else{
            alert("no user Id provided went wrong");
        }
    }


    render() {

        //Props passed to to Create New Note and Edit forms.
        let show = this.state.show;
        let showEdit = this.state.showEdit;
        let userId = this.state.userId;
        let Auth = this.state.passedAuth;
        let noteId = this.state.noteId;
        let currentToken = this.state.currentToken;

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
        
        //Redirect back to Login.
        const logOut = this.state.logOut;

        if (logOut == true) {
            return (
                <Router>
                    <Route logOut="/Login" component={Login}/>
                </Router>
            );
        }

        return (
            <div>
                <div>
                    <IconTabs username={this.state.users.username} exitApp={this.signOut} editDetails={this.editDetails}/>
                </div>
                <SwipeableDrawer
                    anchor="top"
                    open={this.state.top}
                    onClose={this.closeEditDetails}
                >
                    <EditUserDetails />
                </SwipeableDrawer>
                <div className="account-body">
                    
                     <div className="note-card">
                        <div className="create-edit-noteBtn-body">
                            <button type="submit" className="cancelBtn" style={{display: show}} onClick={this.closeNoteForm}>Cancel</button>
                            <button className="createBtn" onClick={this.createNote}>Create+</button>
                        </div>
                        <div className="note-inner-body">
                            <div style={{display: showEdit}}>
                                <div className="create-edit-noteBtn-body">
                                    <button type="submit" className="edit-cancelBtn" style={{display: showEdit}} onClick={this.closeEditForm}>x</button>
                                </div>    
                                <EditNote reRenderRecords={this.componentDidUpdate} currentToken={currentToken} noteId={noteId} Auth={Auth} userId={userId} />
                            </div>
                            <div style={{ display: show}}>
                                <CreateNote reRenderRecords={this.componentDidUpdate} currentToken={currentToken} Auth={Auth} userId={userId} />
                            </div>
                            {items && getItems()}
                        </div>
                     </div>
                </div>
            </div>
        );
    }
}
export default Welcome;