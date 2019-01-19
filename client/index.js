//Libs
import React,  { Component } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from "react-dom";

//Component
import Login from "./components/forms/loginForm";
import UserDashboard from "./components/notesPage";
import { Header } from "./components/base/header";
import axios from "axios";

//Styles
import "./sass/main.scss";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userId: "",
      token: "",
      auth: false,
      toLogin: true,
      toDashboard: true,
      userData: {}
    };
  }
  componentDidMount(){
    let userId = this.state.userId;
    let token= this.state.token;

    let headers = {
        "Content-Type" : "application/json",
        "x-access-token" : token 
    };
    
    axios.get("http://localhost:3000/api/notes/users/"+userId, {headers: headers})
    .then(res => {
        //Fetches response data from api and sets it to users object
        const newUserData = res.data;
        this.setState({ 
          userData: newUserData
        });
    });
  }
  componentDidUpdate(userData) {
    if (this.state.auth !== this.data.auth) {
        this.setState({
          auth: userData.Auth,
          userId: userData.userId,
          token: userData.Token
        });
    }
  }

  getAuthState(userData) {
    if(userData) {
      this.componentDidUpdate(userData)
      this.setState({
        auth: userData.Auth,
        userId: userData.userId,
        token: userData.Token
      });
    }else{
      let userData = {
        userId: this.state.userId,
        token: this.state.token,
        authState:  this.state.auth
      }
    }

    
  }

  render() {

    let userId = this.state.userId;
    let token= this.state.token;
    let authState =  this.state.auth;

    let displayComponent = () => {
      if (authState == false) {
        return (
          <Route  toLogin='/Login' component={ () => <Login  authStateCallback={this.getAuthState}/> }/> 
        );
      }

      if (authState == true) {
        return (
          <Route  toDashboard='/UserDashboard' component={ () => <UserDashboard  token={token} Auth={authState} userId={userId} /> } />
        );
      }
    }
    
    return (
      <div>
        { authState == false ? <Header /> : ''}
        <div className="content"> 
          <Router>
            { displayComponent() }
          </Router>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<App />, document.getElementById("app"));