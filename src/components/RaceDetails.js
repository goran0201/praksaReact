import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

export default class RaceDetails extends React.Component {
  state = {
    qualifyngDetails: [],
    raceResults: [],
    raceLocation: [],
    isLoading: true
  };

  componentDidMount() {
    this.getQualifiersDetails();
  }

  getQualifiersDetails = async () => {
    const raceId = this.props.match.params.raceId;
    const url = `http://ergast.com/api/f1/2013/${raceId}/qualifying.json`;
    const urlResults = `http://ergast.com/api/f1/2013/${raceId}/results.json`;
    const response = await fetch(url);
    const response2 = await fetch(urlResults);
    const qualifiers = await response.json();
    const results = await response2.json();
    const qualifiersDetails = qualifiers.MRData.RaceTable.Races[0].QualifyingResults;
    const location = qualifiers.MRData.RaceTable.Races;
    const raceResults = results.MRData.RaceTable.Races[0].Results;
    this.setState({
      qualifyngDetails: qualifiersDetails,
      raceResults: raceResults,
      raceLocation: location,
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
      <div>
        <table className="table-small">
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          {this.state.raceLocation.map((location, i) => {
            return (
              <tbody key={i}>
                <tr>
                  <td>{location.raceName}</td>
                  <td>Country: {location.Circuit.Location.country}</td>
                  <td>Location: {location.Circuit.Location.locality}</td>
                  <td>Date: {location.date}</td>
                  <td>Full report:{location.Circuit.url}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <table className="table-race-details">
          <thead>
            <tr>
              <th>Qualifying results</th>
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
        <table className="table-race-details">
          <thead>
            <tr>
              <th>Race results</th>
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
    );
  }
}