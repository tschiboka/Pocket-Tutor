import React, { Component } from "react";

import "../Results/Results.css";

export default class Results extends Component {
    render() {
        return (
            this.props.visible && <div className="results">
                <div className="results__header">RESULTS</div>

                <div className="results__body"></div>

                <div className="results__footer">
                    <button>OK</button>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of Results