import React from "react";



export default class RaceDetails extends React.Component {

  state = {
    qualifyngDetails: [],
    raceResults: []

  };

  componentDidMount() {
    this.getQualifiersDetails();

  }

  getQualifiersDetails = async () => {

    const raceId = this.props.match.params.raceId;
    const url = `http://ergast.com/api/f1/2013/${raceId}/qualifying.json`;
    const urlResults = `http://ergast.com/api/f1/2013/${raceId}/results.json`;
    console.log("raceId", raceId);

    const response = await fetch(url);
    const response2 = await fetch(urlResults);

    console.log("response", response);

    const qualifiers = await response.json();
    const results = await response2.json();
    console.log("qualifiers", qualifiers);

    const qualifiersDetails = qualifiers.MRData.RaceTable.Races[0].QualifyingResults;
    const raceResults = results.MRData.RaceTable.Races[0].Results;
    console.log("qualifiersDetails", qualifiersDetails);

    this.setState({
      qualifyngDetails: qualifiersDetails,
      raceResults: raceResults
    });
  };



  render() {
    return (
      <div>
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
            return (
              <tbody key={i}>
                <tr>
                  <td>{qualifying.position}</td>
                  <td> {qualifying.Driver.familyName}</td>
                  <td> {qualifying.Constructor.name}</td>
                  <td> {qualifying.Q3}</td>
                </tr>
              </tbody>
            );
          })}
        </table>

        <div>

        </div>
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
            return (
              <tbody key={index}>
                <tr>
                  <td>{result.position}</td>
                  <td> {result.Driver.familyName}</td>
                  <td> {result.Constructor.name}</td>
                  <td> {result.Time?.time}</td>
                  <td> {result.points}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }

}