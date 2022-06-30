import React from "react";
import RaceDetails from "./RaceDetails";
import Flag from 'react-flagkit';
import history from "./../history";


export default class Races extends React.Component {

  state = {
    races: [],
    seasons: {},
    flags: []

  }



  componentDidMount() {
    this.getRaces();
  }

  getRaces = async () => {
    const url = "http://ergast.com/api/f1/2013/results/1.json";
    const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const response = await fetch(url);
    const responseFlags = await fetch(urlFlags);
    const races = await response.json();
    const flagsConvert = await responseFlags.json();

    // console.log("races", races.MRData.RaceTable.Races);
    const allRaces = races.MRData.RaceTable.Races;
    const seasons = races.MRData.RaceTable;
    console.log("flags", this.state.flags);
    this.setState({
      races: allRaces,
      seasons: seasons,
      flags: flagsConvert
    });

  }

  handleQualifyng = (raceId) => {
    // console.log("raceID", raceId);
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
                    
                    <td>
                    {this.state.flags.map((flag, index) => {
                        if (race.Circuit.Location.country === flag.en_short_name) {
                          return (<Flag key={index} country={flag.alpha_2_code} />);
                        } else if (race.Circuit.Location.country === "UK" && flag.nationality === "British, UK") {
                          return (<Flag key={index} country="GB" />);
                        }
                       

                      })}
                      {race.raceName}</td>
                    <td>{race.Circuit.circuitName}</td>
                    <td>{race.date}</td>
                    <td>
                    {this.state.flags.map((flag, index) => {
                        if (race.Results[0].Driver.nationality === flag.nationality) {
                          return (<Flag key={index} country={flag.alpha_2_code} />);
                        } else if (race.Results[0].Driver.nationality === "UK" && flag.nationality === "British, UK") {
                          return (<Flag key={index} country="GB" />);
                        }
                       

                      })}
                      {race.Results[0].Driver.familyName}</td>
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