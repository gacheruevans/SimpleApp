"use strict"
import React, { Component } from "react";
import axios from "axios";

import "./style.scss";

class EditNote extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            title: props.title,
            description: props.description,
            userId: props.userId,
            noteId: props.noteId
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
        const noteID = this.state.noteId;

        const recordData = {
            title: this.state.title,
            description: this.state.description
        }
        //Checks whether there is data in the recordData object
        if (recordData) {
            axios.put("http://localhost:3000/api/notes/users/"+userId+"/note/"+noteID, recordData)
            .then(res => console.log(res.data));

            alert("Note has been Edited successfully!");

        }else{
            alert("Something went wrong!!!");
        }
    }
  
    render() {
      return (
          <div className="base-form">
            <form onSubmit={this.onSubmit}>
                <div className="form-title"><h3 className="my-3"> Edit Note Form</h3></div>

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
                    <button type="submit" className="registerBtn">Edit</button>
                </div>
            </form>
        </div> 
      );
    }
  }
  export default EditNote;

  

