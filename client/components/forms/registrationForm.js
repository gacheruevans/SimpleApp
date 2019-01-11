"use strict"
import React, { Component } from "react";
import axios from "axios";

import "./style.scss";

class Register extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username:"",
            password: ""
        };
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
  
    }
    onChangeUsername (e){
        this.setState({
            username: e.target.value
        });
    }
    onChangePassword (e){
        this.setState({
            password: e.target.value
        });
    }
  
    onSubmit(e) {
        e.preventDefault();
       
        const recordData = {
            username: this.state.username,
            password: this.state.password
        }
        if (recordData) {
            axios.post("http://localhost:3000/api/notes/register", recordData)
            .then(res => console.log(res.data));

            //After post of data clear the state of username and password
            this.setState({
                username: "",
                password: ""
            }); 
        }else{
            alert("Something went wrong!!!")
        }
        
    }
  
    render() {
      return (
          <div className="base-form">
            <form onSubmit={this.onSubmit}>
                <div className="form-title"><h3 className="my-3"> Sign Up Form</h3></div>

                <div className="form-body">
                    <div className="firstfield-rw">
                        <label>Username</label>
                        <input type="email" id="email" name="email"  placeholder="email" value={this.state.username}  onChange={this.onChangeUsername} required/>
                    </div>
                    <div className="secondfield-rw">
                        <label>Password</label>
                        <input type="password" id="password" name="password"  placeholder="password" value={this.state.password} onChange={this.onChangePassword} required/>
                    </div>
                </div>
                
                <div className= "footer">
                    <a href="#" >Login</a>
                    <button type="submit" className="registerBtn">Register</button>
                </div>
            </form>
        </div> 
      );
    }
  }
  export default Register;

  

