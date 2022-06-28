import React from "react";
state=[
  qualifiersDetails = [],
  // resultsDetalis = []
]

export default class RaceDetails extends React.Component {

    getqualifiersDetails =async() => {

      const racesId = this.props.match.params.racesId;
    const url = "http://ergast.com/api/f1/2013/${racesId}/qualifying.json";
    console.log(racesId);

    const response = await fetch(url);
    console.log("responseDT", response);
    const qualifiers = await response.json();
    console.log("qualifiers", qualifiers);
    const qualifiersDetails = drivers.MRData.StandingsTable.StandingsLists[0].DriverStandings;
    console.log("qualifiersDetails", qualifiersDetails);
    this.setState({
      qualifiersDetails: qualifiers
    });
  };



      render() {
        return (
            <div>
                RaceDetails
          </div>
        );
      }

}