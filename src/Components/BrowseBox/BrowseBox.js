import React, { Component } from "react";

import "./BrowseBox.css";

export default class BrowseBox extends Component {
    render() {
        return (
            this.props.visible
                ?
                <div className="browse-box">
                    <div className="browse-box__header"></div>

                    <div className="browse-box__body"></div>

                    <div className="browse-box__footer"></div>
                </div>
                : null
        ); // end of return
    } // end of render
} // end of BrowseBox