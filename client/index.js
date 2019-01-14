//Libs
import React,  { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from "react-dom";
import axios from "axios";

//Component
import Login from "./components/forms/loginForm";
import { Header } from "./components/base/header";

//Styles
import "./sass/main.scss";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      auth: false,
      toLogin: true,
      toDashboard: true
    };
  }

  componentDidMount() {
    this.getAuth();
  }

  componentDidUpdate(){
    this.updateAuth();
  }
  
  getAuth() {
    axios.get("http://localhost:3000/api/notes/")
      .then(res => {
          console.log("Auth state after refresh>>>>>" ,res.data.authState)
          //Fetch auth state
          const authState = res.data.authState;
          this.setState({ 
              auth: authState
          });
      });
  }

  updateAuth(){
    //Update auth
    this.setState({
        auth: currentAuthState
    });
  }
  
  render() {
    let authState = this.state.auth;
    let toLogin = this.state.toLogin;
    let toDashboard = this.state.toDashboard;
    //Fetch data from child component login
    let getAuthState = (currentAuthState) =>{
        //pass current auth state to updateAuth function
        this.updateAuth(currentAuthState);
    }
    return (
      <div>
        <Header />
        <div className="content"> 
          <Router>
            {/* handles browser refresh to stay on currently signed in page */}
            {authState == false ?  
            <Route  authStateCallback={this.getAuthState} toLogin='/Login' authState={authState} component={Login} /> :  <Route  toDashboard='/Login' component={Login} />}
          </Router>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));