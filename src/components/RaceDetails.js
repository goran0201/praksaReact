import React from "react";
 


export default class RaceDetails extends React.Component {

  state = {
    qualifyngDetails: []
    
  };

  // componentDidMount() {
  //   this.getQualifiersDetails();
  // }

  getQualifiersDetails = async () => {

    const raceId = this.props.match.params.raceId;
    const url = `http://ergast.com/api/f1/2013/${raceId}/qualifying.json`;
    console.log("raceId", raceId);

    const response = await fetch(url);
    console.log("response", response);
    const qualifiers = await response.json();
    console.log("qualifiers", qualifiers);
    const qualifiersDetails = qualifiers.MrData.RaceTable.Races;
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
          </thead>
          {this.state.qualifyngDetails.map((qualifying, i) => {
            return (
              <tbody key={i}>
                <tr>
                  <td>{}</td>
                  <td> {}</td>
                  <td> {}</td>
                  <td> {}</td>
                  <td>{}</td>
                </tr>
              </tbody>
            );
          })}
        </table>

      </div>
    );
  }

}