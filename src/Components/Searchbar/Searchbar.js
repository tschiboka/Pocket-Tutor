import React, { Component } from "react";

import "./searchbar.css";

export default class Searchbar extends Component {
    render() {
        return (
            <div className="searchbar-container">
                <input
                    id="searchbar-input"
                    type="text"
                    maxlength="20"
                    placeholder="Search cards content" />
            </div>
        ); // end of return
    } // end of render
} // end of Searchbar