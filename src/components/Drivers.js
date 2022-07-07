import React from "react";
import history from "./../history";
import Loader from "./Loader";
import Flag from 'react-flagkit';
import Breadcrumb from "./Breadcrumb";

export default class Drivers extends React.Component {
    state = {
        allDrivers: [],
        seasons: {},
        isLoading: true,
        flags: []
    };

    componentDidMount() {
        this.getDrivers();
    }

    getDrivers = async () => {
        let year = 2012;
        const url = `http://ergast.com/api/f1/${year}/driverStandings.json`;
        const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
        const response = await fetch(url);
        const responseFlags = await fetch(urlFlags);
        const drivers = await response.json();
        const flags = await responseFlags.json();
        const allDrivers = drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        const seasons = drivers.MRData.StandingsTable;
        this.setState({
            allDrivers: allDrivers,
            seasons: seasons,
            isLoading: false,
            flags: flags
        });
    };

    handleDrivers = (driverId) => {
        const linkTo = "/driverDetails/" + driverId;
        history.push(linkTo);
    };

    render() {
        if (this.state.isLoading) {
            return (
                <div className="loading-div">
                    <p className="loading">loading...</p>
                    <Loader />
                </div>
            );
        }

        const breadcrumb = [
            {
                title: "Drivers",
                url: "/drivers"
            }
        ];

        return (
            <>
                <div className="top-level-background">
                    <Breadcrumb breadcrumb={breadcrumb} />
                    <div className="background">
                        <h1 className="title">Drivers Campionship</h1>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th colSpan="4" className="title-small">Drivers Championship Standings - {this.state.seasons.season}</th>
                                </tr>
                            </thead>
                            {this.state.allDrivers.map((driver, i) => {
                                return (
                                    <tbody key={i} onClick={() => this.handleDrivers(driver.Driver.driverId)}>
                                        <tr>
                                            <td>{driver.position}</td>
                                            <td>
                                                <div className="flag-container">
                                                    <div className="flag">
                                                        {this.state.flags.map((flag, i) => {
                                                            if (driver.Driver.nationality === flag.nationality) {
                                                                return (<Flag className="flag-size" key={i} country={flag.alpha_2_code} />);
                                                            } else if (driver.Driver.nationality === "British" && flag.nationality === "British, UK") {
                                                                return (<Flag className="flag-size" key={i} country="GB" />);
                                                            } else if (driver.Driver.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic") {
                                                                return (<Flag className="flag-size" key={i} country="NL" />);
                                                            }
                                                        })}
                                                    </div>
                                                    <div className="flag-text">
                                                        {driver.Driver.givenName} {driver.Driver.familyName}
                                                    </div>
                                                </div>
                                            </td>
                                            <td>{driver.Constructors[0].name}</td>
                                            <td>{driver.points}</td>
                                        </tr>
                                    </tbody>
                                );
                            })}
                        </table>
                    </div>
                </div>
            </>
        );
    }
}