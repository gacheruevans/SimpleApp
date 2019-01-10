'use strict'
import React, { Component } from "react";
import { ButtonToolbar, Button } from 'react-bootstrap';
import "./style.scss";

class Login extends Component {
    constructor(props, context) {
      super(props, context);
  
    //   this.handleChange = this.handleChange.bind(this);
  
      this.state = {
        value: ''
      };
    }
  
    // getValidationState() {
    //   const length = this.state.value.length;
    //   if (length > 10) return 'success';
    //   else if (length > 5) return 'warning';
    //   else if (length > 0) return 'error';
    //   return null;
    // }
  
    // handleChange(e) {
    //   this.setState({ value: e.target.value });
    // }
  
    render() {
      return (
          <div className="login-form">
            <form >
                <div className="form-title"><h3 className="my-3"> Login:</h3></div>

                <div className="form-body">
                    <div className="email-rw">
                        <label>Username</label>
                        <input type="email" id="email" placeholder="email"/>
                    </div>
                    <div className="pass-rw">
                        <label>Password</label>
                        <input type="password"id="password" placeholder="password"/>
                    </div>
                </div>
                
                <div className= "footer">
                    <button className="loginBtn">Login</button>
                    <button className="registerBtn">Register</button>
                </div>
            </form>
        </div> 
      );
    }
  }
  export default Login;

  

