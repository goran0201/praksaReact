import React from "react";
import Breadcrumb from "./Breadcrumb";


export default class Home extends React.Component {


    render() {
        const breadcrumb = [
            {
                title: "",
                url: ""
            }
        ];
        return (
            <div className="top-level-background">
                <Breadcrumb breadcrumb={breadcrumb} />
                <div className="background">
                    <div className="home-img">
                        <img src={require(`./../img/F1_home.jpg`).default} />
                    </div>
                </div>
            </div>
        );
    }

}