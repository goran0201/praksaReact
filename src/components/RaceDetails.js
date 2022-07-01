import React from "react";
import Loader from "./Loader";
import Flag from 'react-flagkit';

export default class RaceDetails extends React.Component {
  state = {
    qualifyngDetails: [],
    raceResults: [],
    raceLocation: [],
    flags: [],
    isLoading: true
  };

  componentDidMount() {
    this.getQualifiersDetails();
  }

  getQualifiersDetails = async () => {
    const raceId = this.props.match.params.raceId;
    const url = `http://ergast.com/api/f1/2013/${raceId}/qualifying.json`;
    const urlResults = `http://ergast.com/api/f1/2013/${raceId}/results.json`;
    const urlFlags = "https://raw.githubusercontent.com/Dinuks/country-nationality-list/master/countries.json";
    const response = await fetch(url);
    const response2 = await fetch(urlResults);
    const responseFlags = await fetch(urlFlags);
    const flagsConvert = await responseFlags.json();
    const qualifiers = await response.json();
    const results = await response2.json();
    const qualifiersDetails = qualifiers.MRData.RaceTable.Races[0].QualifyingResults;
    const location = qualifiers.MRData.RaceTable.Races;
    const raceResults = results.MRData.RaceTable.Races[0].Results;
    this.setState({
      qualifyngDetails: qualifiersDetails,
      raceResults: raceResults,
      raceLocation: location,
      flags: flagsConvert,
      isLoading: false
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
            {this.state.raceLocation.map((location, i) => {
              return (
                <tbody key={i}>
                  <tr>
                    <th className="table-small-header" colSpan="2">
                      <div className="flag-container-raceDetails">
                        <div className="name-div-raceDetails">
                          {location.raceName}
                        </div>
                        <div className="flag-raceDetails">
                          {this.state.flags.map((flag, index) => {
                            if (location.Circuit.Location.country === flag.en_short_name) {
                              return (<Flag key={index} country={flag.alpha_2_code} size={84} />);
                            } else if (location.Circuit.Location.country === "UK" && flag.en_short_name === "United Kingdom of Great Britain and Northern Ireland") {
                              return (<Flag key={index} country="GB" size={84} />);
                            } else if (location.Circuit.Location.country === "UAE" && flag.en_short_name === "United Arab Emirates") {
                              return (<Flag key={index} country="AE" size={84} />);
                            } else if (location.Circuit.Location.country === "Korea" && flag.en_short_name === "Korea (Democratic People's Republic of)") {
                              return (<Flag key={index} country="KR" />);
                            } else if (location.Circuit.Location.country === "USA" && flag.en_short_name === "United States of America") {
                              return (<Flag key={i} country="US" size={84} />);
                            }
                          })}
                        </div>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th>Country: </th>
                    <td>{location.Circuit.Location.country}</td>
                  </tr>
                  <tr>
                    <th>Location: </th>
                    <td>{location.Circuit.Location.locality}</td>
                  </tr>
                  <tr>
                    <th>Date: </th>
                    <td>{location.date}</td>
                  </tr>
                  <tr>
                    <th>Full report: </th>
                    <td><a href={location.Circuit.url} target="_blank" style={{color: "white"}} >link</a></td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
        <div className="background-details">
          <table className="table-details-race">
            <thead>
              <tr>
                <th colSpan="4" className="title-small">Qualifying results</th>
              </tr>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Best time</th>
              </tr>
            </thead>
            {this.state.qualifyngDetails.map((qualifying, i) => {
              let times = [];
              times.push(qualifying.Q1);
              times.push(qualifying.Q2);
              times.push(qualifying.Q3);
              times.sort();
              return (
                <tbody key={i}>
                  <tr>
                    <td>{qualifying.position}</td>
                    <td>
                      <div className="flag-container">
                        <div className="flag">
                          {this.state.flags.map((flag, index) => {
                            if (qualifying.Driver.nationality === flag.nationality) {
                              return (<Flag key={index} country={flag.alpha_2_code} />);
                            } else if (qualifying.Driver.nationality === "British" && flag.nationality === "British, UK") {
                              return (<Flag key={index} country="GB" />);
                            } else if (qualifying.Driver.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic") {
                              return (<Flag key={index} country="NL" />);
                            }
                          })}
                        </div>
                        <div className="flag-text">
                          {qualifying.Driver.familyName}
                        </div>
                      </div>
                    </td>
                    <td> {qualifying.Constructor.name}</td>
                    <td> {times[0]}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
          <table className="table-details-race">
            <thead>
              <tr>
                <th colSpan="5" className="title-small">Race results</th>
              </tr>
              <tr>
                <th>Pos</th>
                <th>Driver</th>
                <th>Team</th>
                <th>Result</th>
                <th>Points</th>
              </tr>
            </thead>
            {this.state.raceResults.map((result, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{result.position}</td>
                    <td>
                      <div className="flag-container">
                        <div className="flag">
                          {this.state.flags.map((flag, index) => {
                            if (result.Driver.nationality === flag.nationality) {
                              return (<Flag key={index} country={flag.alpha_2_code} />);
                            } else if (result.Driver.nationality === "British" && flag.nationality === "British, UK") {
                              return (<Flag key={index} country="GB" />);
                            } else if (result.Driver.nationality === "Dutch" && flag.nationality === "Dutch, Netherlandic") {
                              return (<Flag key={index} country="NL" />);
                            }
                          })}
                        </div>
                        <div className="flag-text">
                          {result.Driver.familyName}
                        </div>
                      </div>
                    </td>
                    <td>{result.Constructor.name}</td>
                    {/* <td>{result.Time !== undefined ? result.Time.time: ""}</td> */}
                    <td>{result.Time?.time}</td>
                    <td>{result.points}</td>
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