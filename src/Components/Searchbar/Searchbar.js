import React, { Component } from "react";

import "./searchbar.css";

export default class Searchbar extends Component {
    render() {
        return (
            <div className="searchbar-container">
                <input
                    id="searchbar-input"
                    type="text"
                    maxLength="30"
                    autoFocus={false}
                    placeholder="Search cards content" />
                <button>
                    <div>&#9906;</div>
                </button>
            </div>
        ); // end of return
    } // end of render
} // end of Searchbar