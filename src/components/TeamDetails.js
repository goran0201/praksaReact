import React from "react";
import Loader from "./Loader";
import Flag from "react-flagkit";

export default class TeamDetails extends React.Component {

  state = {
    details1: [],
    details2: [],
    seasons: {},
    isLoading: true,
    flags: []
  };

  componentDidMount() {
    this.getDetails();
  };

  getDetails = async () => {
    const constructorId = this.props.match.params.constructorId;
    const urlDetails = `http://ergast.com/api/f1/2013/constructors/${constructorId}/constructorStandings.json`;
    const urlResults = `http://ergast.com/api/f1/2013/constructors/${constructorId}/results.json`;
    const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const response1 = await fetch(urlDetails);
    const response2 = await fetch(urlResults);
    const dataFlags = await fetch(urlFlags);
    const teams1 = await response1.json();
    const teams2 = await response2.json();
    const flags = await dataFlags.json();
    const details1 = teams1.MRData.StandingsTable.StandingsLists[0].ConstructorStandings;
    const details2 = teams2.MRData.RaceTable.Races;
    const seasons = teams1.MRData.StandingsTable;

    this.setState({
      details1: details1,
      details2: details2,
      seasons: seasons,
      isLoading: false,
      flags: flags
    });
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
      <div className="table-container">
        <div className="table-small-container">
          <table className="table-small">
            {this.state.details1.map((details1, seasons, i) => {
              return (
                <tbody key={i}>
                  <tr>
                    <th className="table-small-header" colSpan="2">
                      <div className="image-container">
                        <div className="img-div">
                          <img src={require(`./../img/teams/${details1.Constructor.constructorId}.png`).default} />
                        </div>
                        <div className="flag-name-container">
                          <div className="flag-div">
                            {this.state.flags.map((flag, index) => {
                              if (details1.Constructor.nationality === flag.nationality) {
                                return (<Flag key={index} country={flag.alpha_2_code} />);
                              } else if (details1.Constructor.nationality === "British" && flag.nationality === "British, UK") {
                                return (<Flag key={index} country="GB" />);
                              }
                            })}
                          </div>
                          <div className="name-div">
                            {details1.Constructor.name}
                          </div>
                        </div>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th>Country: </th>
                    <td>{details1.Constructor.nationality}</td>
                  </tr>
                  <tr>
                    <th>Position: </th>
                    <td>{details1.position}</td>
                  </tr>
                  <tr>
                    <th>Points: </th>
                    <td>{details1.points}</td>
                  </tr>
                  <tr>
                    <th>History: </th>
                    <td><a href={details1.Constructor.url} target="_blank" style={{color: "white"}} >link</a></td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        <div className="background-details">
          <table className="table-details">
            <thead>
              <tr>
                <th colSpan="5" className="title-small">Formula 1 {this.state.seasons.season} Results</th>
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
                <tbody key={i}>
                  <tr>
                    <td>{details2.round}</td>
                    <td>
                      <div className="flag-container">
                        <div className="flag">
                          {this.state.flags.map((flag, index) => {
                            if (details2.Circuit.Location.country === flag.en_short_name) {
                              return (<Flag key={index} country={flag.alpha_2_code} />);
                            } else if (details2.Circuit.Location.country === "UK" && flag.nationality === "British, UK") {
                              return (<Flag key={index} country="GB" />);
                            } else if (details2.Circuit.Location.country === "Korea" && flag.en_short_name === "Korea (Democratic People's Republic of)") {
                              return (<Flag key={index} country="KR" />);
                            }
                          })}
                        </div>
                        <div className="flag-text">
                          {details2.raceName}
                        </div>
                      </div>
                    </td>
                    <td>{details2.Results[0].position}</td>
                    <td>{details2.Results[1].position}</td>
                    <td>{parseInt(details2.Results[0].points) + parseInt(details2.Results[1].points)}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}