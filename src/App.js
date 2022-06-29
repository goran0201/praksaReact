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
            <div className="main">
                <Router history = {history}>
                    <nav className="navigation">
                        <ul>
                            <li>
                                <Link to = "/">Drivers</Link>
                                <Link to = "/teams">Teams</Link>
                                <Link to = "/races">Races</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path = "/" exact component = {Drivers} />
                        <Route path = "/teams" exact component = {Teams} />
                        <Route path = "/races" exact component = {Races} />
                        <Route path = "/driverDetails/:driverId" exact component = {DriverDetails} />
                        <Route path = "/teams/details/:constructorId" exact component = {TeamDetails} />
                        <Route path = "/raceDetails/:raceId" exact component = {RaceDetails} />
                    </Switch>
                </Router>
            </div>
    );
    
    }
}
