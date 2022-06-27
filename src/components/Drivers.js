import React from "react";


export default class Drivers extends React.Component {
    state = {
        allDrivers: []
    }

    getDrivers = async () => {
        const url = "'http://ergast.com/api/f1/2013";
        const response = await fetch(url);
        console.log("resp", response.headers.get('content-type'));
        const drivers = await response.json();
        console.log("drivers resp", drivers);
        this.setState({
            allDrivers: drivers        
        });
    };
    
      render() {
        return (
            <div>
                Drivers
          </div>
        );
      }

}