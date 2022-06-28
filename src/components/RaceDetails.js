import React from "react";
 


export default class RaceDetails extends React.Component {

  state = {
    qualifyngDetails: []
    
  };

  // componentDidMount() {
  //   this.getQualifiersDetails();
  // }

  getQualifiersDetails = async () => {

    const raceId = this.props.match.params.raceId;
    const url = `http://ergast.com/api/f1/2013/${raceId}/qualifying.json`;
    console.log("raceId", raceId);

    const response = await fetch(url);
    console.log("response", response);
    const qualifiers = await response.json();
    console.log("qualifiers", qualifiers);
    // const qualifiersDetails = '';
    console.log("qualifiersDetails", qualifiersDetails);
    this.setState({
      qualifyngDetails: qualifiers
    });
  };



  render() {
    return (
      <div>
        Race Details

      </div>
    );
  }

}