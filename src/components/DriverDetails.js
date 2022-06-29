import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

export default class DriverDetails extends React.Component {
  state = {
    driverDetails: [],
    racesDetails: [],
    seasons: {},
    isLoading: true
  };

  componentDidMount() {
    this.getDriverDetails();
  }

  getDriverDetails = async () => {
    const driverId = this.props.match.params.driverId;
    const url = `http://ergast.com/api/f1/2013/drivers/${driverId}/driverStandings.json`;
    const urlRaces = `https://ergast.com/api/f1/2013/drivers/${driverId}/results.json`;
    const response = await fetch(url);
    const responseRaces = await fetch(urlRaces);
    const drivers = await response.json();
    const races = await responseRaces.json();
    const driverDetails = drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    const racesDetails = races.MRData.RaceTable.Races;
    const seasons = drivers.MRData.StandingsTable;
    this.setState({
      driverDetails: driverDetails,
      racesDetails: racesDetails,
      seasons: seasons,
      isLoading: false
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div>
          <p>loading...</p>
          <PulseLoader size={12} color="coral" />
        </div>
      );
    }
    return (
      <div className="table-container">
        <table className="table-small">
          {this.state.driverDetails.map((driverDetail, i) => {
            return (
              <tbody key={i}>
                <tr>
                  <th colSpan="2">{driverDetail.Driver.givenName} {driverDetail.Driver.familyName}</th>
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
        <table className="table">
          <thead>
            <tr>
              <th colSpan="5">Formula 1 {this.state.seasons.season} Results</th>
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
    );
  }
}