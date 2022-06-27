import React from "react";
import * as $ from "jquery";
import TeamDetails from "./TeamDetails";


export default class Teams extends React.Component {

  state = {
    allTeams: []
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

    this.setState({
      allTeams: allTeams
    });
  };


  render() {
    return (
      <>
        <h1>Constructors Campionship</h1>
        <p>Constructors Championship Standings - 2013</p>
        {this.state.allTeams.map( (team, i) => {
          return (
            <div key = {i}>
              <table className = "table">
                <thead>
                  <tr>
                    <th>{team.position}</th>
                    <th>{team.Constructor.constructorId}</th>
                    <th><a href={team.Constructor.url}>Details</a></th>
                    <th>{team.points}</th>
                  </tr>
                </thead>
             </table>
            </div>
          );
        })}
      </>
    )}}
      
