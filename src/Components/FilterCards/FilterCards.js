import React, { Component } from "react";

import "./FilterCards.css";

export default class FilterCards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "range": [0, 100],
            "topics": []
        }; // end of state declaration
    } // end of constructor



    closeFilterCards() {
        // set back default
        const newState = {
            "range": [0, 100],
            "topics": []
        }; // end of default state declaratoion

        this.setState(newState);

        this.props.closeFilterCards(false);
    } // end of closeFilterCards



    render() {
        return (
            <div className="filter-cards">
                <div className="filter-cards__header">
                    Filter Cards

                    <button
                        id="cancel-filter-cards-btn"
                        onClick={() => this.closeFilterCards()}
                    >&times;</button>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of FilterCards