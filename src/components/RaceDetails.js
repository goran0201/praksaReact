import React from "react";
// state=[
//   qualifiersDetails = []

// ]

export default class RaceDetails extends React.Component {

  getQualifiersDetails = async () => {

    const raceName = this.props;
    // const url = `http://ergast.com/api/f1/2013/${raceName}/qualifying.json`;
    console.log("proba", raceName);

    // const response = await fetch(url);
    // console.log("response", response);
    // const qualifiers = await response.json();
    // console.log("qualifiers", qualifiers);
    // const qualifiersDetails = '';
    // console.log("qualifiersDetails", qualifiersDetails);
    // this.setState({
    //   qualifiersDetails: qualifiers
    // });
  };



  render() {
    return (
      <div>
        RaceDetails
      </div>
    );
  }

}