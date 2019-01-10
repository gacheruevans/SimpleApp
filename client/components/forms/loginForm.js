'use strict'
import React, { Component } from "react";
import axios from "axios";

import "./style.scss";

class Login extends Component {
    constructor(props, context) {
      super(props, context);
  
    this.login = this.login.bind(this);
  
      this.state = {
        value: ''
      };
    }
  
    login(e) {
        let username = document.getElementById('email');
        let password = document.getElementById('password').value;
        resultElement.innerHTML = '';

        axios.post('http://jsonplaceholder.typicode.com/todos', {
            username: username,
            password: password
        })
        .then(resultElement.innerHTML, (error, res) => {
          resultElement.innerHTML = generateSuccessHTMLOutput(res);
        })
        .catch(error => res.status(400).send(error));
        
        e.preventDefault();
    }
  
    render() {
      return (
          <div className="login-form">
            <form >
                <div className="form-title"><h3 className="my-3"> Login Form</h3></div>

                <div className="form-body">
                    <div className="email-rw">
                        <label>Username</label>
                        <input type="email" id="email" name="email"  placeholder="email" required/>
                    </div>
                    <div className="pass-rw">
                        <label>Password</label>
                        <input type="password" id="password" name="password"  placeholder="password" required/>
                    </div>
                </div>
                
                <div className= "footer">
                    <button className="loginBtn" onClick={this.login}>Login</button>
                    <button className="registerBtn">Register</button>
                </div>
            </form>
        </div> 
      );
    }
  }
  export default Login;

  

