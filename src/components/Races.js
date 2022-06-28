import React from "react";
import RaceDetails from "./RaceDetails";
import history from "./../history";

export default class Races extends React.Component {

  state = {
    races: [],
    seasons: {}
  }

  handleQualifyng = (racesId) => {
    console.log("racesID", racesId);
    const linkTo = "/raceDetails/" + racesId;
    history.push(linkTo);
  }

  componentDidMount() {
    this.getRaces();
  }

  getRaces = async () => {
    const url = "http://ergast.com/api/f1/2013/results/1.json";
    const response = await fetch(url);
    const races = await response.json();
    console.log("races", races.MRData.RaceTable.Races);
    const allRaces = races.MRData.RaceTable.Races;
    const seasons = races.MRData.RaceTable;
    this.setState({
      races: allRaces,
      seasons: seasons
    });

  }

  


  render() {

    return (
      <div>
        <h2>Race calendar</h2>
        <h3><RaceDetails /></h3>

        <div>
          <table className="tableRace">

            <thead>
              <tr>
            <th align="left">Race callendar - {this.state.seasons.season}</th>
            </tr>
              <tr>
                <th>Round</th>
                <th>Grand Prix</th>
                <th>Circuit</th>
                <th>Date</th>
                <th>Winner</th>
              </tr>
            </thead>

            <tbody >
              {this.state.races.map((race, i) => {
                return (
                  <tr key={i} onClick={() => this.handleQualifyng(race.raceName.racesId)}>
                    <td>{race.round}</td>
                    <td>{race.raceName}</td>
                    <td>{race.Circuit.circuitName}</td>
                    <td>{race.date}</td>
                    <td>{race.Results[0].Driver.familyName}</td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>



      </div>
    );
  }

}