"use strict"
//Libs
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from "axios";

//Styles
import "./style.scss";

//Components
import UserDashboard from '../notesPage';

class CreateNote extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            title: "",
            description: "",
            userId: "47",
            toDashBoard: false
        };
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
  
    }
    onChangeTitle (e){
        this.setState({
            title: e.target.value
        });
    }
    onChangeDescription (e){
        this.setState({
            description: e.target.value
        });
    }
  
    onSubmit(e) {
        e.preventDefault();
        const userId = this.state.userId;

        const recordData = {
            title: this.state.title,
            description: this.state.description
        }
        //checkes if data is present in the recordData object
        if (recordData) {
            axios.post("http://localhost:3000/api/notes/users/"+userId+"/note/", recordData)
            .then(res => console.log(res.data));
            
            //Clears data from states and set redirect state to true
            this.setState({
                title: "",
                description: "",
                toDashBoard: true
            }); 

            alert("A new note has been Created successfully!");
        }else{
            alert("Something Went wrong!!!");
        }
    }
  
    render() {
        //Redirect back to user dashboard after note is created.
        const toDashBoard = this.state.toDashBoard;
        if (toDashBoard == true) {
            return <Router><Route toDashBoard='/UserDashboard' component={UserDashboard}/></Router>
        }
        return (
            <div className="base-form">
                <form onSubmit={this.onSubmit}>
                    <div className="form-title"><h3 className="my-3"> Create New Note Form</h3></div>

                    <div className="form-body">
                        <div className="firstfield-rw">
                            <label>Title</label>
                            <input type="text" id="title" name="title"  value={this.state.title}  onChange={this.onChangeTitle} required/>
                        </div>
                        <div className="secondfield-rw">
                            <label className="description">Description</label>
                            <textarea id="description" name="description" rows="4" cols="50" value={this.state.description} onChange={this.onChangeDescription} required></textarea>
                        </div>
                    </div>
                    
                    <div className= "footer">
                        <button type="submit" className="registerBtn">Create</button>
                    </div>
                </form>
            </div> 
        );
    }
  }
  export default CreateNote;

  

