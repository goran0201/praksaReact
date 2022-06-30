import React from "react";
import Loader from "./Loader";
import Flag from 'react-flagkit';

export default class RaceDetails extends React.Component {
  state = {
    qualifyngDetails: [],
    raceResults: [],
    raceLocation: [],
    flags: [],
    isLoading: true
  };

  componentDidMount() {
    this.getQualifiersDetails();
  }

  getQualifiersDetails = async () => {
    const raceId = this.props.match.params.raceId;
    const url = `http://ergast.com/api/f1/2013/${raceId}/qualifying.json`;
    const urlResults = `http://ergast.com/api/f1/2013/${raceId}/results.json`;
    const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const response = await fetch(url);
    const response2 = await fetch(urlResults);
    const responseFlags = await fetch(responseFlags);
    const qualifiers = await response.json();
    const results = await response2.json();
    const qualifiersDetails = qualifiers.MRData.RaceTable.Races[0].QualifyingResults;
    const location = qualifiers.MRData.RaceTable.Races;
    const raceResults = results.MRData.RaceTable.Races[0].Results;
    const flags = flags;
    
    this.setState({
      qualifyngDetails: qualifiersDetails,
      raceResults: raceResults,
      raceLocation: location,
      flags: flags,
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
            {this.state.raceLocation.map((location, i) => {
              return (
                <tbody key={i}>
                  <tr>
                    <th className="table-small-header" colSpan="2">{location.raceName}
                   
                    </th>
                  </tr>
                  <tr>
                    <th>Country: </th>
                    <td>{location.Circuit.Location.country}</td>
                  </tr>
                  <tr>
                    <th>Location: </th>
                    <td>{location.Circuit.Location.locality}</td>
                  </tr>
                  <tr>
                    <th>Date: </th>
                    <td>{location.date}</td>
                  </tr>
                  <tr>
                    <th>Full report: </th>
                    <td><a href={location.Circuit.url}>link</a></td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        <div className="background-details">
          <table className="table-details-race">
            <thead>
              <tr>
                <th colSpan="4" className="title-small">Qualifying results</th>
              </tr>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Best time</th>
              </tr>
            </thead>
            {this.state.qualifyngDetails.map((qualifying, i) => {
              let times = [];
              times.push(qualifying.Q1);
              times.push(qualifying.Q2);
              times.push(qualifying.Q3);
              times.sort();
              return (
                <tbody key={i}>
                  <tr>
                    <td>{qualifying.position}</td>
                    <td> {qualifying.Driver.familyName}</td>
                    <td> {qualifying.Constructor.name}</td>
                    <td> {times[0]}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>

          <table className="table-details-race">
            <thead>
              <tr>
                <th colSpan="5" className="title-small">Race results</th>
              </tr>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Result</th>
                <th>Points</th>
              </tr>
            </thead>
            {this.state.raceResults.map((result, index) => {
              console.log("time", result.Time);
              return (
                <tbody key={index}>
                  <tr>
                    <td>{result.position}</td>
                    <td>{result.Driver.familyName}</td>
                    <td>{result.Constructor.name}</td>
                    {/* <td>{result.Time !== undefined ? result.Time.time: ""}</td> */}
                    <td>{result.Time?.time}</td>
                    <td>{result.points}</td>
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