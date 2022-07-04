import React from "react";
import history from "./../history";
import Loader from "./Loader";
import Flag from 'react-flagkit';

export default class Races extends React.Component {
  state = {
    races: [],
    seasons: {},
    isLoading: true,
    flags: []
  };

  componentDidMount() {
    this.getRaces();
  }

  getRaces = async () => {
    const url = "http://ergast.com/api/f1/2013/results/1.json";
    const response = await fetch(url);
    const races = await response.json();
    const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const responseFlags = await fetch(urlFlags);
    const flagsConvert = await responseFlags.json();
    const allRaces = races.MRData.RaceTable.Races;
    const seasons = races.MRData.RaceTable;
    this.setState({
      races: allRaces,
      seasons: seasons,
      isLoading: false,
      flags: flagsConvert
    });

  };

  handleQualifyng = (raceId) => {
    const linkTo = "/raceDetails/" + raceId;
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
          <h1 className="title">Race calendar</h1>
          <table className="table">
            <thead>
              <tr>
                <th colSpan="5" className="title-small" >Race callendar - {this.state.seasons.season}</th>
              </tr>
              <tr className="race-th">
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
                  <tr key={i} onClick={() => this.handleQualifyng(race.round)}>
                    <td>{race.round}</td>
                    <td>
                      <div className="flag-container">
                        <div className="flag">
                          {this.state.flags.map((flag, index) => {
                            if (race.Circuit.Location.country === flag.en_short_name) {
                              return (<Flag className="flag-size" key={index} country={flag.alpha_2_code} />);
                            } else if (race.Circuit.Location.country === "UK" && flag.en_short_name === "United Kingdom of Great Britain and Northern Ireland") {
                              return (<Flag className="flag-size" key={index} country="GB" />);
                            } else if (race.Circuit.Location.country === "UAE" && flag.en_short_name === "United Arab Emirates") {
                              return (<Flag className="flag-size" key={index} country="AE" />);
                            } else if (race.Circuit.Location.country === "Korea" && flag.en_short_name === "Korea (Democratic People's Republic of)") {
                              return (<Flag className="flag-size" key={index} country="KR" />);
                            } else if (race.Circuit.Location.country === "USA" && flag.en_short_name === "United States of America") {
                              return (<Flag className="flag-size" key={i} country="US" />);
                            }
                          })}
                        </div> 
                        <div className="flag-text">
                          {race.raceName}
                        </div>
                      </div>
                    </td>
                    <td>{race.Circuit.circuitName}</td>
                    <td>{race.date}</td>
                    <td>
                      <div className="flag-container">
                        <div className="flag">
                          {this.state.flags.map((flag, index) => {
                            if (race.Results[0].Driver.nationality === flag.nationality) {
                              return (<Flag className="flag-size" key={index} country={flag.alpha_2_code} />);
                            } else if (race.Results[0].Driver.nationality === "British" && flag.nationality === "British, UK") {
                              return (<Flag className="flag-size" key={index} country="GB" />);
                            }
                          })}
                        </div>
                        <div className="flag-text">
                          {race.Results[0].Driver.familyName}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};