import React from "react";
 


export default class RaceDetails extends React.Component {

  state = {
    qualifyngDetails: []
    
  };
  

  getQualifiersDetails = async () => {

    const racesName = this.props.match.params.racesId;
    const url = `http://ergast.com/api/f1/2013/${racesId}/qualifying.json`;
    console.log("proba", racesName);

    const response = await fetch(url);
    console.log("response", response);
    const qualifiers = await response.json();
    console.log("qualifiers", qualifiers);
    const qualifiersDetails = '';
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