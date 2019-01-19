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
            userId: this.props.userId,
            passedAuth: this.props.Auth,
            username: this.props.username,
            newPassword: "",
            confirmPassword: "",
            currentToken: this.props.currentToken,
            reRender: this.props.reRenderRecords
        };
        this.onChangenewPassword = this.onChangenewPassword.bind(this);
        this.onChangeconfirmPassword = this.onChangeconfirmPassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangenewPassword (e){
        this.setState({
            newPassword: e.target.value
        });
    }
    
    onChangeconfirmPassword (e){
        this.setState({
            confirmPassword: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
         //Fetch  user ids fetched from the state
        let userId = this.state.userId;

       
        //Checks whether there is data in the recordData object
        if (userId) {
            //Header that will pass token to api
            let token = this.state.currentToken;
            let headers = {
                "Content-Type": "application/json",
                "x-access-token": token 
            };

            axios.put("http://localhost:3000/api/notes/users/"+userId, {headers: headers})
                .then(res => {
                    console.log(res.data)
                    //Clears data from states
                    this.setState({
                        newPassword: "",
                        confirmPassword: ""
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
                <div className="form-edit-title"><h3 className="my-3"> Edit User Details</h3></div>

                <div className="form-body grid-container">
                    <div className="grid-item">
                        <label className="edit-label">Username</label>
                    </div>
                    <div className="grid-item">
                        <input className="edit-input" type="text" id="username" name="username"  value={this.state.username}  onChange={this.onChangeUsername} required/>
                    </div>
                    <div className="grid-item">
                        <label className="edit-label">New Password</label>
                    </div>
                    <div className="grid-item">
                        <input className="edit-input" type="text" id="newPassword" name="newPassword"  value={this.state.newPassword}  onChange={this.onChangenewPassword} required/>
                    </div>
                    <div className="grid-item">
                        <label className="edit-label">Confirm Password</label>
                    </div>
                    <div className="grid-item">
                        <input className="edit-input" type="text" id="confirmPassword" name="confirmPassword"  value={this.state.newPassword}  onChange={this.onChangeconfirmPassword} required/>
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

  

