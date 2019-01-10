'use strict'
import React, { Component } from "react";
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
                <div className="email-rw">
                    <label>Email</label>
                    <input type="email" id="email"/>
                </div>
                <div className="pass-rw">
                    <label>Password</label>
                    <input type="password"id="password"/>
                </div>
                <div className="text-center mt-4">
                    <button  type="submit"> Login</button>
                </div>
                <div className="font-weight-light">
                    <p>Not a member? Sign Up</p>
                    <p>Forgot Password?</p>
                </div>
            </form>
        </div> 
      );
    }
  }
  export default Login;

  

