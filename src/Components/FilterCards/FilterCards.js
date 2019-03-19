import React, { Component } from "react";

import "./FilterCards.css";

import RangeWithTwoSliders from "../RangeWithTwoSliders/RangeWithTwoSliders";

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



    getSliderValues(min, max) {
        const newState = this.state;

        newState.range = [min, max];

        console.log(min, max);
        this.setState(newState);
    } // end of getSliderValues



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

                <section className="filter-cards__results-section">
                    Results between:

                    <RangeWithTwoSliders
                        id="filter-cards__range"
                        getValues={this.getSliderValues.bind(this)}
                        min={0}
                        max={100}
                    />
                </section>
            </div>
        ); // end of return
    } // end of render
} // end of FilterCards