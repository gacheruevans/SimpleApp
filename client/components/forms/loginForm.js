"use strict"
//libs
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from "axios";
const jwt = require('jsonwebtoken');
const config = require('../../../server/config/config');

//Components
import UserDashboard from '../notesPage';
import Register from './registrationForm';

//Styels
import "./style.scss";

class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username:'',
            password: '',
            isAuth: false,
            userId: '',
            token:'',
            dashBoard: false,
            registerButton: false
        };

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.registerUser = this.registerUser.bind(this);
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

    registerUser (e) {
        this.setState({
            registerButton: true
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const recordData = {
            username: this.state.username,
            password: this.state.password
        }

        // Checks if data is in recordData object
        if(recordData) {
             axios.post('http://localhost:3000/api/notes/login', recordData)
            .then(res => {

                const newAuth = res.data.auth;
                const newToken = res.data.token;

                const userId = jwt.verify(newToken, config.keySecrete, function(err, decoded) {
                    if (err) {
                        return res.status(500).send(
                            { auth: false, message: 'Failed to authenticate token.' }
                        );
                    }
                    // Send decoded id
                    return decoded.id;
                 });
                 //After post of data clear the state of username and password and set userId with decoded id from token
                 this.setState({
                    username: '',
                    password: '',
                    toDashBoard: true,
                    token: newToken,
                    isAuth: newAuth,
                    userId: userId
                }); 
            });
        }else{
            alert('Incorrect username and password!- retry again!!')
        }
    }
  
    render() {
        // Checks state of dashboard so at to redirect the user.
        const toDashBoard = this.state.toDashBoard;
        const Auth = this.state.isAuth;
        const userId =  this.state.userId;
        const currentToken = this.state.token;

        if (toDashBoard == true) {
            return (
                <Router>    
                    <Route toDashBoard='/UserDashboard' component={ () => <UserDashboard token={currentToken} Auth={Auth} userId={userId} />} />
                </Router>
            );
        }
        //Fetch registration form.
        const registerButton = this.state.registerButton;
        if (registerButton == true) {
            return (
                    <Router>
                        <Route registerButton='/Register' component={Register}/>
                    </Router>
            );
        }
        return (
            <div className="base-form">
                <form onSubmit={this.onSubmit}>
                    <div className="form-title"><h3 className="my-3"> Login Form</h3></div>

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
                    
                    <div className="footer">
                        <button type="submit" className="loginBtn">Login</button>
                    </div>
                </form>
                <div className="login-signup-footer">
                    <p> Have an account? No worries, Just Login! <button type="submit" className="registerBtn" onClick={this.registerUser}>Sign Up</button></p>
                </div>
            </div>
         );
    }
  }
  export default Login;

  

