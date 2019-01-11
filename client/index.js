//Libs
import React from "react";
import ReactDOM from "react-dom";

//Component
import Login from "./components/forms/loginForm";
import { Header } from "./components/base/header";

//Styles
import "./sass/main.scss";

const App = () => {
  return (
    <div>
        <Header />
        <div className="content"> 
            <Login />
        </div>
    </div>
  )
};
ReactDOM.render(<App />, document.getElementById("app"));