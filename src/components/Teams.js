import React from "react";
import history from "./../history";
import Loader from "./Loader";
import Flag from 'react-flagkit';

export default class Teams extends React.Component {

  state = {
    allTeams: [],
    seasons: {},
    isLoading: true,
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
    const teams = await data.json();
    const flags = await dataFlags.json();
    const allTeams = teams.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    const seasons = teams.MRData.StandingsTable;
    this.setState({
      allTeams: allTeams,
      seasons: seasons,
      isLoading: false,
      flags: flags
    });
  };

  handleTeams = (constructorId) => {
    const linkTo = "/teams/details/" + constructorId;
    history.push(linkTo);
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="loading-div">
          <p className="loading">loading...</p>
          <Loader />
        </div>
      );
    }
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
                      <div className="flag-container">
                        <div className="flag">
                          {this.state.flags.map((flag, index) => {
                            if (team.Constructor.nationality === flag.nationality) {
                              return (<Flag key={index} country={flag.alpha_2_code} />);
                            } else if (team.Constructor.nationality === "British" && flag.nationality === "British, UK") {
                              return (<Flag key={index} country="GB" />);
                            }
                          })}
                        </div>
                        <div className="flag-text">
                          {team.Constructor.name}
                        </div>
                      </div>
                    </td>
                    <td>Details  <a href={team.Constructor.url} target="_blank"><img src={require("./../img/link-black.png").default} width={16} height={16}/></a></td>
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
