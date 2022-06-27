import React from "react";


export default class Drivers extends React.Component {
    state = {
        allDrivers: []
    };

    componentDidMount() {
        this.getDrivers();
    }

    getDrivers = async () => {
        const url = "http://ergast.com/api/f1/2013/driverStandings.json";
        const response = await fetch(url);
        console.log("resp", response);
        const drivers = await response.json();
        console.log("drivers resp", drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        const allDrivers = drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings;
        this.setState({
            allDrivers: allDrivers
        });
    };

    render() {
        return (
            <div>

                {this.state.allDrivers.map((driver,i) => {
                    return (
                        <div key={i}>
                            <h3>{driver.position}</h3>
                            <h3>{driver.Driver.givenName} {driver.Driver.familyName}</h3>
                            <h3>{driver.Constructors[0].name}</h3>
                            <h3>{driver.points}</h3>
                        </div>
                    );
                })}



            </div>
        );
    }

}