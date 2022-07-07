import React from "react";
import { Link } from "react-router-dom";

const breadcrumb = {
    backgroundColor: "white",
    /* border: "1px solid rgb(0,0,0, .125)", */
    /* borderRadius: "0.37rem" */
    textDecoration: "none"
};

export default class Breadcrumb extends React.Component {
    render() {
        return (
            <nav className="top-nav">
                <ul className="breadcrumb">
                    <Link to="/">Home</Link>
                    {this.props.breadcrumb.map((crumb, i) => {
                        return (
                            <li key={i} className="breadcrumb-item align-items-center">
                                <Link to={crumb.url}>/{crumb.title}</Link>
                            </li>
                        );
                    })
                    }
                </ul>
            </nav>
        );
    };
}