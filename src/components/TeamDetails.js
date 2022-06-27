import React from "react";


export default class TeamDetails extends React.Component {

  state = {
    details: []
  };

  componentDidMount() {
    this.getDetails();
  };

  getDetails = async () => {
    const url = "http://ergast.com/api/f1/2013/constructors/01/constructorStandings.json";
  }





  render() {
    return (
      <div>
        TeamDetails
      </div>
    );
  }

}