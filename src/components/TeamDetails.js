import React from "react";


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
    // console.log(response2);
    const details1 = teams1.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    const details2 = teams2.MRData.RaceTable.Races;
    console.log(details2);
    const seasons = teams1.MRData.StandingsTable;


    this.setState({
      details1: details1,
      details2: details2,
      seasons: seasons,
      isLoading: false
    });

  }

  render() {

    if(this.state.isLoading) {
      return (<h2>Loading...</h2>)
    }

    console.log("state", this.state.details2);
    return (
      <div>
        <table className="table-small">
          <thead>
            <tr>
              <th>Team details</th>
            </tr>
          </thead>
          {this.state.details1.map((details1, i) => {
            return (
              <tbody key={i}>
                <tr>
                  <td>{details1.Constructor.constructorId}</td>
                  <td>Country: {details1.Constructor.nationality}</td>
                  <td>Position: {details1.position}</td>
                  <td>Points: {details1.points}</td>
                  <td>History:<a href={details1.Constructor.url}>link</a></td>
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


              <tr key={i}>
                <td>{details2.round}</td>
                <td>{details2.raceName}</td>
                <td>{details2.Results[0].position}</td>
                <td>{details2.Results[1].position}</td>
                <td>{parseInt(details2.Results[0].points) + parseInt(details2.Results[1].points)}</td>
              </tr>


            );
          })}

        </table>
      </div>
    );
  }

}