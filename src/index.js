import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App"; // export deafault nacin
// import { App } from "./App"; // export bez default
import "./css/main.css";
import "./scss/styles.scss"

/* class App extends React.Component {
    render() {
        return (
            <div>
                <h2>Hello React, Webpack & Babel !!!</h2>
                <h3>Hello GP</h3>
            </div>
        );
    }
} */

//novija sintaksa
var root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);

// starija sintaksa ne koristi se od v18
// ReactDOM.render(<App />, document.getElementById("app"));

// 1. nacin poz kompo  cesce se koristi
{/* <App /> */ }
// 2. nacin poz kompo 
{/* <App> </App> */ }