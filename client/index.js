import React from "react";
import ReactDOM from "react-dom";

import Register from "./components/forms/RegistrationForm";
import Login from "./components/forms/loginForm";
import NotesList from "./components/notesPage";

import "./sass/main.scss";

const App = () => {
  return (
    <div>
        {/* <Register /> */}
        {/* <NotesList /> */}
        <div className="top-container">
          <h1>Welcome</h1>
        </div>

        <div className="header" id="myHeader">
          <h2>NOTY</h2>
        </div>
        <div className="content"> <Login /></div>
    </div>
  )
};
ReactDOM.render(<App />, document.getElementById("app"));