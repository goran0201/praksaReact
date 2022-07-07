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

    constructor() {
        super();

        let selectedSeason = localStorage.getItem("selectedSeason");
        if (!selectedSeason) {
            selectedSeason = new Date().getFullYear();
        }
        localStorage.setItem("selectedSeason", selectedSeason);
        this.state = {
            seasons: [],
            selectedSeason: selectedSeason
        };
    }

    async componentDidMount() {
        const url = "http://ergast.com/api/f1/seasons.json?limit=100";
        const response = await fetch(url);
        const allSeasons = await response.json();

        this.setState({
            seasons: allSeasons.MRData.SeasonTable.Seasons
        });
    }

    seasonChanged = (event) => {
        const selectedSeason = parseInt(event.target.value);
        localStorage.setItem("selectedSeason", selectedSeason);
        this.setState({
            selectedSeason: selectedSeason
        });
    };

    render() {
        return (
            <div className="main">
                <Router history={history}>
                    <div className="seasonSelectionWrapper">
                    </div>
                    {/* <div className="main-container"> */}
                    <nav className="navigation">
                        <select onChange={this.seasonChanged} value={this.state.selectedSeason}>
                            {this.state.seasons.map((season) => {
                                return (<option key={season.season}>{season.season}</option>);
                            })}
                        </select>
                        <ul className="nav-list">
                            <li className="nav-link">
                                <div className="devider-logo">
                                    <Link to="/">
                                        {/* <div className="logo"> */}
                                        <img className="logo-img" src={`/img/F1-logo.png`} />
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
