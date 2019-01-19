"use strict"
//Libs
import React, { Component } from "react";
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
            close: 'block',
            userId: this.props.userId,
            passedAuth: this.props.Auth,
            currentToken: this.props.currentToken,
            reRender: this.props.reRenderRecords
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
        //Checkes if form data is present in the recordData object
        if (recordData) {
            //header that will pass token to api
            let token = this.state.currentToken;
            let headers = {
                "Content-Type": "application/json",
                "x-access-token": token 
            };
            axios.post("http://localhost:3000/api/notes/users/"+userId+"/note/", recordData, {headers: headers})
            .then(res => {
                console.log(res.data)
                
                //Clears some data from states and sets redirect and list update state to true
                this.setState({
                    title: "",
                    description: "",
                    createNoteStatus: true
                }); 
            });
            alert("A new note has been Created successfully!");
            this.props.reRenderRecords;
        }else{
            alert("Something Went wrong!!!");
        }
    }
  
    render() {
        return (
            <div className="create-base-form">
                <form onSubmit={this.onSubmit}>
                    <div className="form-create-title"><h3 className="my-3"> Create A New Note</h3></div>

                    <div className="form-body grid-container">
                        <div className="grid-item">
                            <label className="create-label">Title</label>
                        </div>
                        <div className="grid-item">
                            <input className="create-input" type="text" id="title" name="title"  value={this.state.title}  onChange={this.onChangeTitle} required/>
                        </div>
                        <div className="grid-item">
                            <label className="create-label">Description</label>
                        </div>
                        <div className="grid-item">
                            <textarea className="create-input" id="description" name="description" rows="2" cols="40" value={this.state.description} onChange={this.onChangeDescription} required></textarea>
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

  

