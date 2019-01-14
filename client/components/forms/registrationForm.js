"use strict"
//Lib
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from "axios";
//Components
import Login from './loginForm';

//Style
import "./style.scss";

class Register extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: '',
            token: '',
            isAuth: false,
            loginButton: false
        };
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.userLogin = this.userLogin.bind(this);
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

    userLogin(e) {
        this.setState({
            loginButton: true
        });
    }

    onSubmit(e) {
        e.preventDefault();
       
        const recordData = {
            username: this.state.username,
            password: this.state.password
        }
        console.log("Posted Data >>>>",recordData)
        if (recordData) {
            axios.post('http://localhost:3000/api/notes/register', recordData)
                .then(res => {

                    const newAuth = res.data.auth;
                    const newToken = res.data.token;
                    //After post of data clear the state of username and password
                    this.setState({
                        username: '',
                        password: '',
                        loginButton: true,
                        isAuth: newAuth,
                        token: newToken
                    }); 
                });

        }else{
            alert("Something went wrong!!!")
        }
        
    }
  
    render() {
        //Fetch login form.
        const loginButton = this.state.loginButton;

        if (loginButton == true) {
            return (
                <Router>
                    <Route loginButton='/Login' component={Login}/>    
                </Router>
            );
        }
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
                        <button type="submit" className="registerBtn">Register</button>
                    </div>
                </form>
                <div className="login-signup-footer">
                    <p> Don't have an account? No worries, Just sign up! <button type="submit" className="loginBtn" onClick={this.userLogin}>Login</button></p>
                </div>
            </div> 
        );
    }
  }
  export default Register;

  

