"use strict"
//libs
import React, { Component } from "react";
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import axios from "axios";

//Components
import UserDashboard from '../notesPage';

//Styels
import "./style.scss";

class Login extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username:"",
            password: "",
            dashBoard: false
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
        
        // Checks if data is in recordData object
        if(recordData) {
             axios.post('http://localhost:3000/api/notes/login', recordData)
            .then(res => console.log(res.data));
            
            this.setState({
                username: "",
                password:"",
                toDashBoard: true
            }); 
        }else{
            alert('Incorrect username and password!- retry again!!')
        }
    }
  
    render() {
        //Checks state of dashboard so at to redirect the user
        const toDashBoard = this.state.toDashBoard;
        if (toDashBoard == true) {
            return <Router><Route toDashBoard='/UserDashboard' component={UserDashboard}/></Router>
        }

        return (
            <div className="content"> 
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
                        
                        <div className= "footer">
                            <button type="submit" className="loginBtn">Login</button>
                            <a className="registerBtn" href="#">Register</a>
                        </div>
                    </form>
                </div>
            </div>
         );
    }
  }
  export default Login;

  

