import React from "react";
import { render } from "react-dom";

import Register from "./components/forms/RegistrationForm";
import Login from "./components/forms/loginForm";
import NotesList from "./components/notesPage";

import "./sass/main.scss";

const App = () =>{
  return (
    <div>
      <h1>Notes Application</h1>
      {/* <Login /> */}
      {/* <Register /> */}
      <NotesList />
    </div>
  )
};
render(<App />, document.getElementById("app"));