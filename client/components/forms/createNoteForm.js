'use strict'
import React, { Component } from "react";
import axios from "axios";

import "./style.scss";

class CreateNote extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            title: '',
            description: '',
            userId: props.userId
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
        axios.post('http://localhost:3000/api/notes/users/'+userId+'/note/', recordData)
        .then(res => console.log(res.data));

        this.setState({
            title: '',
            description: ''
        }); 
    }
  
    render() {
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
                        <label>Description</label>
                        <input type="text" id="description" name="description"  placeholder="description" value={this.state.description} onChange={this.onChangeDescription} required/>
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

  

