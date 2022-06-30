import React from "react";
import PulseLoader from "react-spinners/PulseLoader";
import Loader from "./Loader";
import Flag from 'react-flagkit';

export default class TeamDetails extends React.Component {

  state = {
    details1: [],
    details2: [],
    seasons: {},
    isLoading: true
  };

  componentDidMount() {
    this.getDetails();
  };

  getDetails = async () => {
    const constructorId = this.props.match.params.constructorId;
    const urlDetails = `http://ergast.com/api/f1/2013/constructors/${constructorId}/constructorStandings.json`;
    const urlResults = `http://ergast.com/api/f1/2013/constructors/${constructorId}/results.json`;
    const response1 = await fetch(urlDetails);
    const response2 = await fetch(urlResults);
    const teams1 = await response1.json();
    const teams2 = await response2.json();
    const details1 = teams1.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    const details2 = teams2.MRData.RaceTable.Races;
    const seasons = teams1.MRData.StandingsTable;
    this.setState({
      details1: details1,
      details2: details2,
      seasons: seasons,
      isLoading: false
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
            {this.state.details1.map((details1, i) => {
              return (
                <tbody key={i}>
                  <tr>
                    <th className="table-small-header" colSpan="2">
                    <img
                      src={require(`./../img/teams/${details1.Constructor.constructorId}.png`).default} />
                      {details1.Constructor.name}</th>
                  </tr>
                  <tr>
                    <th>Country: </th>
                    <td>{details1.Constructor.nationality}</td>
                  </tr>
                  <tr>
                    <th>Position: </th>
                    <td>{details1.position}</td>
                  </tr>
                  <tr>
                    <th>Points: </th>
                    <td>{details1.points}</td>
                  </tr>
                  <tr>
                    <th>History: </th>
                    <td><a href={details1.Constructor.url}>link</a></td>
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
                <th colSpan="5" className="title-small">Formula 1 {this.state.seasons.season} Results</th>
              </tr>
              <tr >
                <th>Round</th>
                <th>Grand Prix</th>
                <th>{this.state.details2[0].Results[0].Driver.familyName}</th>
                <th>{this.state.details2[0].Results[1].Driver.familyName}</th>
                <th>Points</th>
              </tr>
            </thead>
            {this.state.details2.map((details2, i) => {
              return (
                <tbody key={i}>
                  <tr>
                    <td>{details2.round}</td>
                    <td>{details2.raceName}</td>
                    <td>{details2.Results[0].position}</td>
                    <td>{details2.Results[1].position}</td>
                    <td>{parseInt(details2.Results[0].points) + parseInt(details2.Results[1].points)}</td>
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