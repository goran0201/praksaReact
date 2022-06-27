import React from "react";
import Drivers from "./components/Drivers";
import DriverDetails from "./components/DriverDetails";
import Teams from "./components/Teams";
import TeamDetails from "./components/TeamDetails";
import Races from "./components/Races";
import RaceDetails from "./components/RaceDetails";
import { Router, Switch, Route, Link } from "react-router-dom";
import history from "./history";



export default class App extends React.Component {
    
    render() {
        return (
        
                <Router history = {history}>
                    <nav>
                        <ul>
                            <li>
                                <Link to = "/">Drivers</Link>
                                <Link to = "/">Teams</Link>
                                <Link to = "/">Races</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path = "/" exact component = {Drivers} />
                        <Route path = "/" exact component = {Teams} />
                        <Route path = "/" exact component = {Races} />
                    </Switch>
                </Router>
        )
    }
}
