import React, { Component } from "react";

import "../RotatingButton/RotatingButton.css";

export default class RotatingButton extends Component {
    render() {
        return (
            <div className="rot-btn">
                <div className="rot-btn__btn-box">
                    <button>&#9650;</button>

                    <button>&#9660;</button>
                </div>
                <div className="rot-btn__num-box">
                    1 2 3
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of RotatingButton class