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
import { isUndefined } from "util";

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      userId: "",
      token: "",
      auth: false,
      toLogin: true,
      toDashboard: true,
      data: []
    };
  }
  componentDidMount() {
    this.getinitialApiResponse();
  }

  // componentDidUpdate(userData) {
  //   // Typical usage (don't forget to compare props):
  //   if (this.state.auth !== this.data.auth) {
  //       console.log("UserData >>>>>>>", userData)
  //       this.setState({
  //         auth: userData.Auth,
  //         userId: userData.userId,
  //         token: userData.Token
  //       });
  //   }
  // }

  getinitialApiResponse() {
    axios.get("http://localhost:3000/api/notes/")
      .then(res => {
          console.log("Get initial data", res.data)
          //Fetches response data from api and sets it to users object
          const resDataAuth = res.data.auth;
          this.setState({
              auth: resDataAuth
          });
      });
  }

  getAuthState(userData) {
    if(userData) {
      //this.componentDidUpdate(userData)
      this.setState({
        auth: userData.Auth,
        userId: userData.userId,
        token: userData.Token
      });
    }
  }

  render() {

    let userId = this.state.userId;
    let token= this.state.token;
    let authState =  this.state.auth;

    // console.log("UserData after getAuthState is called >>>>>>", userData)

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
        <Header />
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