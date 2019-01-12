import React from "react";
import { render } from "react-dom";
import "./sass/main.scss";

const App = () =>{
  return (
    <div>
      <h1>Simple Application</h1>
    </div>
  )
};
render(<App />, document.getElementById("app"));