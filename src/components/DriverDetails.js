import React from "react";


export default class DriverDetails extends React.Component {
  state = {
    driverDetails: [],
    racesDetails: [],
    isLoading: true
  };

  componentDidMount() {
    this.getDriverDetails();
  }

  getDriverDetails = async () => {
    const driverId = this.props.match.params.driverId;
    const url = `http://ergast.com/api/f1/2013/drivers/${driverId}/driverStandings.json`;
    const urlRaces = `https://ergast.com/api/f1/2013/drivers/${driverId}/results.json`;
   // console.log("test",urlRaces);
    const response = await fetch(url);
    const responseRaces = await fetch(urlRaces);
    const drivers = await response.json();
    const races = await responseRaces.json();
    const driverDetails = drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    const racesDetails = races.MRData.RaceTable.Races;
    this.setState({
      driverDetails: driverDetails,
      racesDetails: racesDetails,
      isLoading: false
    });
  };

  render() {
    if(this.state.isLoading) {
      return (<h2>Loading...</h2>)
    }
    console.log(this.state);
    return (
      <div>
        <table className="table-small">
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
        <table className="table">
          <thead>
            <tr>
              <th>Formula 1 2013 Results</th>
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