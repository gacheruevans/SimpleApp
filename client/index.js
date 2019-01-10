import React from "react";
import { render } from "react-dom";

import Login from "./components/forms/loginForm";
import "./sass/main.scss";

const App = () =>{
  return (
    <div>
      <h1>Notes Application</h1>
      <Login />
    </div>
  )
};
render(<App />, document.getElementById("app"));