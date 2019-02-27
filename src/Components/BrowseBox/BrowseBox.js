import React, { Component } from "react";

import "./BrowseBox.css";

export default class BrowseBox extends Component {
    render() {
        return (
            this.props.visible
                ?
                <div className="browse-box">

                </div>
                : null
        ); // end of return
    } // end of render
} // end of BrowseBox