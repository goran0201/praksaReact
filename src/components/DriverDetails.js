import React from "react";
import Loader from "./Loader";
import Flag from 'react-flagkit';

export default class DriverDetails extends React.Component {
  state = {
    driverDetails: [],
    racesDetails: [],
    seasons: {},
    isLoading: true,
    flags: []
  };

  componentDidMount() {
    this.getDriverDetails();
  }

  getDriverDetails = async () => {
    const driverId = this.props.match.params.driverId;
    const url = `http://ergast.com/api/f1/2013/drivers/${driverId}/driverStandings.json`;
    const urlRaces = `https://ergast.com/api/f1/2013/drivers/${driverId}/results.json`;
    const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const response = await fetch(url);
    const responseRaces = await fetch(urlRaces);
    const responseFlags = await fetch(urlFlags);
    const drivers = await response.json();
    const races = await responseRaces.json();
    const flags = await responseFlags.json();
    const driverDetails = drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    const racesDetails = races.MRData.RaceTable.Races;
    const seasons = drivers.MRData.StandingsTable;
    this.setState({
      driverDetails: driverDetails,
      racesDetails: racesDetails,
      seasons: seasons,
      isLoading: false,
      flags: flags
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <p>loading...</p>
          <Loader />
        </div>
      );
    }
    return (
      <div className="table-container">
        <div className="table-small-container">
          <table className="table-small">
            {this.state.driverDetails.map((driverDetail, i) => {
              console.log(driverDetail.Driver.driverId)
              return (
                <tbody key={i}>
                  <tr>
                    <th colSpan="2">
                    <img src={require(`./../img/drivers/${driverDetail.Driver.driverId}.jpg`).default} />
                      {this.state.flags.map((flag,i) => {
                        if( driverDetail.Driver.nationality === flag.nationality ) {
                          return( <Flag key={i} country={flag.alpha_2_code} /> );
                        } else if (driverDetail.Driver.nationality === "British" && flag.nationality === "British, UK") {
                          return (<Flag key={i} country="GB" /> );
                        } else if (driverDetail.Driver.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic") {
                          return (<Flag key={i} country="NL" /> );
                        }
                      })}
                      {driverDetail.Driver.givenName} {driverDetail.Driver.familyName}
                    </th>
                  </tr>
                  <tr>
                    <th>Country: </th>
                    <td>{driverDetail.Driver.nationality}</td>
                  </tr>
                  <tr>
                    <th>Team: </th>
                    <td>{driverDetail.Constructors[0].name}</td>
                  </tr>
                  <tr>
                    <th>Birth: </th>
                    <td>{driverDetail.Driver.dateOfBirth}</td>
                  </tr>
                  <tr>
                    <th>Biography: </th>
                    <td><a href={driverDetail.Driver.url}>Link</a></td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        <div className="background-details">
          <table className="table-details">
            <thead>
              <tr>
                <th className="table-small-header title-small" colSpan="5" >Formula 1 {this.state.seasons.season} Results</th>
              </tr>
              <tr>
                <th>Round</th>
                <th>Grand Prix</th>
                <th>Teams</th>
                <th>Grid</th>
                <th>Race</th>
              </tr>
            </thead>
            {this.state.racesDetails.map((raceDetail, i) => {
              return (
                <tbody key={i}>
                  <tr>
                    <td>{raceDetail.round}</td>
                    <td>{raceDetail.raceName}</td>
                    <td>{raceDetail.Results[0].Constructor.name}</td>
                    <td>{raceDetail.Results[0].grid}</td>
                    <td>{raceDetail.Results[0].position}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}

