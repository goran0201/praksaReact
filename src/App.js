import React from "react";
import Home from "./components/Home";
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
                <Router history={history}>
                    {/* <div className="main-container"> */}
                    <nav className="navigation">
                        <ul className="nav-list">
                            <li className="nav-link">
                                <div className="devider-logo">
                                    <Link to="/">
                                        {/* <div className="logo"> */}
                                        <img className="logo-img" src={require(`./img/F1-logo.png`).default} />
                                        {/* </div> */}
                                    </Link>
                                </div>
                                <div className="devider-links">
                                    <Link to="/drivers">Drivers</Link>
                                    <Link to="/teams">Teams</Link>
                                    <Link to="/races">Races</Link>
                                </div>
                            </li>
                        </ul>
                    </nav>
                    {/* </div> */}
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/drivers" exact component={Drivers} />
                        <Route path="/teams" exact component={Teams} />
                        <Route path="/races" exact component={Races} />
                        <Route path="/driverDetails/:driverId" exact component={DriverDetails} />
                        <Route path="/teams/details/:constructorId" exact component={TeamDetails} />
                        <Route path="/raceDetails/:raceId" exact component={RaceDetails} />
                    </Switch>
                </Router>
            </div>
        );

    }
}
