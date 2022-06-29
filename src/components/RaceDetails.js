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
   // console.log("raceId", raceId);
    const response = await fetch(url);
    const response2 = await fetch(urlResults);
   // console.log("response", response);
    const qualifiers = await response.json();
    const results = await response2.json();
    console.log("json",results);
   // console.log("qualifiers", qualifiers);
    const qualifiersDetails = qualifiers.MRData.RaceTable.Races[0].QualifyingResults;
   // console.log("qualifiersDetails", qualifiersDetails);
    const raceResults = results.MRData.RaceTable.Races[0].Results;
 console.log("raceResults",raceResults);
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
                let times = [];
                times.push(qualifying.Q1);
                times.push(qualifying.Q2);
                times.push(qualifying.Q3);
                times.sort();
               // console.log("times", times);
                
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
            console.log("time", result.Time)
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