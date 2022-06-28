import React from "react";



export default class RaceDetails extends React.Component {

  state = {
    qualifyngDetails: []

  };

  componentDidMount() {
    this.getQualifiersDetails();
  }

  getQualifiersDetails = async () => {

    const raceId = this.props.match.params.raceId;
    const url = `http://ergast.com/api/f1/2013/${raceId}/qualifying.json`;
    console.log("raceId", raceId);

    const response = await fetch(url);
    console.log("response", response);
    const qualifiers = await response.json();
    console.log("qualifiers", qualifiers);
    const qualifiersDetails = qualifiers.MRData.RaceTable.Races[0].QualifyingResults;
    console.log("qualifiersDetails", qualifiersDetails);
    this.setState({
      qualifyngDetails: qualifiersDetails
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

      </div>
    );
  }

}