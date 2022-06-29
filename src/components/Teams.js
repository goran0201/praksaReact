import React from "react";
import history from "./../history";
import TeamDetails from "./TeamDetails";


export default class Teams extends React.Component {

  state = {
    allTeams: [],
    seasons: {}
  };

  componentDidMount() {
    this.getTeams();
  };

  getTeams = async () => {
    const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
    const data = await fetch(url);
    console.log("data", data);
    const teams = await data.json();
    console.log("teams", teams);
    const allTeams = teams.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    console.log("allTeams", allTeams);
    const seasons = teams.MRData.StandingsTable;
    console.log("seasons", seasons);

    this.setState({
      allTeams: allTeams,
      seasons: seasons
    });
  };

  handleTeams = (constructorId) => {
    const linkTo = "/teams/details/" + constructorId;
    history.push(linkTo);
}


  render() {
    return (
      <>
        
        <div className="background">
          <h1 className="title">Constructors Campionship</h1>
          <table className="table">
            <thead>
              <tr>
                <th colSpan="4" className="title-small">Constructors Championship Standings - {this.state.seasons.season}</th>
              </tr>
            </thead>
            {this.state.allTeams.map((team, i) => {
              return (
                <tbody key={i} onClick={() => this.handleTeams(team.Constructor.constructorId)}>
                  <tr>
                    <td>{team.position}</td>
                    <td>{team.Constructor.name}</td>
                    <td><a href={team.Constructor.url}>Details</a></td>
                    <td>{team.points}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </>
    );
  }
}
