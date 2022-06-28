import React from "react";


export default class DriverDetails extends React.Component {
  state = {
    driverDetails: [],
    racesDetails: []
  };

  componentDidMount() {
    this.getDriverDetails();
    //  this.getRacesDetails();
  }

  getDriverDetails = async () => {
    const url = "http://ergast.com/api/f1/2013/drivers/vettel/driverStandings.json";
    const response = await fetch(url);
    console.log("responseDT", response);
    const drivers = await response.json();
    console.log("driversDT", drivers);
    const driverDetails = drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    console.log("driverDetail", driverDetails);
    this.setState({
      driverDetails: driverDetails
    });
  };

  getRacesDetails = async () => {
    const url = "https://ergast.com/api/f1/2013/drivers/vettel/results.json";
    const response = await fetch(url);
    console.log("respRaces", response);
    const races = await response.json();
    console.log("racesDrv", races);
    const racesDetails = drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    console.log("racesDeatils", racesDetails);
    this.setState({
      racesDetails: racesDetails
    });
  };


  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>driver details</th>
            </tr>
          </thead>
          {this.state.driverDetails.map((driverDetail, i) => {
            return (
              <tbody key={i}>
                <tr>
                  <td>{driverDetail.Driver.givenName} {driverDetail.Driver.familyName}</td>
                  <td>Country: {driverDetail.Driver.nationality}</td>
                  <td>Team: {driverDetail.Constructors[0].name}</td>
                  <td>Birth: {driverDetail.Driver.dateOfBirth}</td>
                  <td><a href={driverDetail.Driver.url}>Biography</a></td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }

}