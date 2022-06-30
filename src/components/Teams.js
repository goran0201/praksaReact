import React from "react";
import history from "./../history";
import TeamDetails from "./TeamDetails";
import Flag from 'react-flagkit';

export default class Teams extends React.Component {

  state = {
    allTeams: [],
    seasons: {},
    flags: []
  };

  componentDidMount() {
    this.getTeams();
  };

  getTeams = async () => {
    const url = "http://ergast.com/api/f1/2013/constructorStandings.json";
    const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const data = await fetch(url);
    const dataFlags = await fetch(urlFlags);
    console.log("data", data);
    const teams = await data.json();
    const flags = await dataFlags.json();
    console.log("teams", teams);
    const allTeams = teams.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    console.log("allTeams", allTeams);
    const seasons = teams.MRData.StandingsTable;
    console.log("seasons", seasons);

    this.setState({
      allTeams: allTeams,
      seasons: seasons,
      flags: flags
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
                    <td>
                      {this.state.flags.map((flag, index) => {
                        if (team.Constructor.nationality === flag.nationality) {
                          return (<Flag key={index} country={flag.alpha_2_code} />);
                        } else if (team.Constructor.nationality === "British" && flag.nationality === "British, UK") {
                          return (<Flag key={index} country="GB" />);
                        }
                })}
                      {team.Constructor.name}
                    </td>
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
