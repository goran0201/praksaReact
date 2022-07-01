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
                <Router history={history}>
                    <div className="main-container">
                        <div className="logo">
                            <img className="logo-img" src={require(`./img/F1-logo.png`).default} />
                        </div>
                        <nav className="navigation">
                            <ul>
                                <li>
                                    <img src={require("./img/nav/helmet.png").default} width={50} height={50}/>
                                    <Link to="/">Drivers</Link>
                                    <img src={require("./img/nav/car.png").default} width={100} height={30}/>
                                    <Link to="/teams">Teams</Link>
                                    <img src={require("./img/nav/flag.png").default} width={50} height={50}/>
                                    <Link to="/races">Races</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <Switch>
                        <Route path="/" exact component={Drivers} />
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
