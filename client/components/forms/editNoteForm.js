"use strict"
//Libs
import React, { Component } from "react";
import axios from "axios";

//Styles
import "./style.scss";

class EditNote extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            title: this.props.title,
            description: this.props.description,
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
         //Fetch  user & note ids fetched from the state
        let userId = this.state.userId;
        let fetchedNoteId = this.props.noteId;

        const recordData = {
            title: this.state.title,
            description: this.state.description
        }
        //Checks whether there is data in the recordData object
        if (recordData) {
            //Header that will pass token to api
            let token = this.state.currentToken;
            let headers = {
                "Content-Type": "application/json",
                "x-access-token": token 
            };

            axios.put("http://localhost:3000/api/notes/users/"+userId+"/note/"+fetchedNoteId, recordData, {headers: headers})
                .then(res => {
                    console.log(res.data)
                    //Clears data from states
                    this.setState({
                        title: "",
                        description: ""
                    }); 
                });
            alert("Note has been Edited successfully!");
            this.props.reRenderRecords;

        }else{
            alert("Something went wrong!!!");
        }
    }
  
    render() {
      return (
          <div className="edit-base-form">
            <form onSubmit={this.onSubmit}>
                <div className="form-edit-title"><h3 className="my-3"> Edit Note</h3></div>

                <div className="form-body grid-container">
                    <div className="grid-item">
                        <label className="edit-label">Title</label>
                    </div>
                    <div className="grid-item">
                        <input className="edit-input" type="text" id="title" name="title"  value={this.state.title}  onChange={this.onChangeTitle} required/>
                    </div>
                    <div className="grid-item">
                        <label className="edit-label">Description</label>
                    </div>
                    <div className="grid-item">
                        <textarea className="edit-input" id="description" name="description" rows="2" cols="40" value={this.state.description} onChange={this.onChangeDescription} required></textarea>
                    </div>
                </div>
                
                <div className= "footer">
                    <button type="submit" className="registerBtn">Update</button>
                </div>
            </form>
        </div> 
      );
    }
  }
  export default EditNote;

  

