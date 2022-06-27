import React from "react";
import Drivers from "./components/Drivers";
import DriverDetails from "./components/DriverDetails";
import Teams from "./components/Teams";
import TeamDetails from "./components/TeamDetails";
import Races from "./components/Races";
import RaceDetails from "./components/RaceDetails";


export default class App extends React.Component {

    
    render() {
    return (
        <div>
            <Drivers />
            <DriverDetails />
            <Teams />
            <TeamDetails />
            <Races />
            <RaceDetails />
        </div>
    );
}
}

