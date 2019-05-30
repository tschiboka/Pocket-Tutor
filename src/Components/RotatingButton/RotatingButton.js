import React, { Component } from "react";

import "../RotatingButton/RotatingButton.css";

export default class RotatingButton extends Component {
    render() {
        return (
            <div className="test__selected-cards-box">
                <button>&#9668;</button>


                <button>&#9658;</button>
            </div>
        ); // end of return
    } // end of render
} // end of RotatingButton class