import React from "react";
import history from "./../history";
import DriverDetails from "./DriverDetails";


export default class Drivers extends React.Component {
    state = {
        allDrivers: [],
        seasons: {}

    };

    componentDidMount() {
        this.getDrivers();
    }

    getDrivers = async () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json";
        const response = await fetch(url);
        console.log("resp", response);
        const drivers = await response.json();
        console.log("drivers",drivers);
        const allDrivers = drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        console.log("drivers resp", allDrivers);
        const seasons = drivers.MRData.StandingsTable;
        console.log("seasons", seasons);
        this.setState({
            allDrivers: allDrivers,
            seasons: seasons
        });
    };

    handleDrivers = (driverId) => {
        console.log("driverID",driverId);
        const linkTo = "/driverDetails/" + driverId;
        history.push(linkTo);
    }

    render() {
        return (
            <>
                
                <div className="background">
                <h1 className="title">Drivers Campionship</h1>
                    <table className="table">
                        <thead>
                            <tr>
                                <th colSpan="4" className="title-small">Drivers Championship Standings - {this.state.seasons.season}</th>
                            </tr>
                        </thead>
                        {this.state.allDrivers.map((driver, i) => {
                            console.log("driverlog",driver);
                            return (
                                <tbody key={i} onClick={() => this.handleDrivers(driver.Driver.driverId)}>
                                    <tr>
                                        <td>{driver.position}</td>
                                        <td>{driver.Driver.givenName} {driver.Driver.familyName}</td>
                                        <td>{driver.Constructors[0].name}</td>
                                        <td>{driver.points}</td>
                                    </tr>
                                </tbody>
                            );
                        })}
                    </table>
                </div>
            </>
        );
    }
}