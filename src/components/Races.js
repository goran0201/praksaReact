import React from "react";
import RaceDetails from "./RaceDetails";
import history from "./../history";
import Flag from 'react-flagkit';

export default class Races extends React.Component {

  state = {
    races: [],
    seasons: {}
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

  handleQualifyng = (raceId) => {
    console.log("raceID", raceId);
    const linkTo = "/raceDetails/" + raceId;
    history.push(linkTo);
  }


  render() {

    return (
      <>

        <div className="background">
          <h1 className="title">Race calendar</h1>
          <table className="table">

            <thead>
              <tr>
                <th colSpan="5" className="title-small" >Race callendar - {this.state.seasons.season}</th>
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
                console.log("race", race);
                return (
                  <tr key={i} onClick={() => this.handleQualifyng(race.round)}>
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



      </>
    );
  }

}