import React, { Component } from "react";

import "./FilterCards.css";

import RangeWithTwoSliders from "../RangeWithTwoSliders/RangeWithTwoSliders";

export default class FilterCards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "range": [0, 100],
            "topicsOptions": JSON.parse(localStorage.topics).map(t => t.name),
            "selectedTopics": ["", "", ""],
        }; // end of state declaration
    } // end of constructor



    resetState() {
        const newState = {
            "range": [0, 100],
            "topicsOptions": JSON.parse(localStorage.topics).map(t => t.name),
            "selectedTopics": ["", "", ""],
        }; // end of default state declaratoion

        const option1 = document.getElementById("card-filter-option1");
        option1.value = "no topic";

        const option2 = document.getElementById("card-filter-option2");
        option2.value = "no topic";

        const option3 = document.getElementById("card-filter-option3");
        option3.value = "no topic";

        this.setState(newState);
    } // end of resetState



    closeFilterCards() {
        this.resetState();

        this.props.closeFilterCards(false);
    } // end of closeFilterCards



    getSliderValues(min, max) {
        const newState = this.state;

        newState.range = [min, max];

        this.setState(newState);
    } // end of getSliderValues



    renderOptions(options) {
        if (options[0] !== "no topic") { options.unshift("no topic") }
        return options.map((o, i) => (
            <option
                disabled={o === "no topic" ? false : this.state.selectedTopics.some(e => e === o)}
                value={o}
                key={i}>{o}
            </option>)
        )
    } // end of renderOptions



    getOptionValue(optionInd) {
        const
            newState = this.state,
            value = document.getElementById("card-filter-option" + optionInd).value;

        newState.selectedTopics.splice(optionInd - 1, 1, value);

        this.setState(newState);
    } // end of getOptionValue



    submit() {
        this.props.submit(this.state.range, this.state.selectedTopics);
        this.props.closeFilterCards();
    } // end of submit



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

                <div className="filter-cards__body">
                    <section className="filter-cards__results-section">
                        Results between:

                        <RangeWithTwoSliders
                            id="filter-cards__range"
                            getValues={this.getSliderValues.bind(this)}
                            min={0}
                            max={100}
                        />
                    </section>

                    <section className="filter-cards__topics">
                        Select topics:

                        <div className="filter-cards__topics__selector-box">
                            <span className="custom-dropdown">
                                <select
                                    id="card-filter-option1"
                                    defaultValue="no topic"
                                    onChange={() => this.getOptionValue(1)}
                                >
                                    {this.renderOptions(this.state.topicsOptions)}
                                </select>
                            </span>

                            <span className="custom-dropdown">
                                <select
                                    id="card-filter-option2"
                                    defaultValue="no topic"
                                    onChange={() => this.getOptionValue(2)}
                                >
                                    {this.renderOptions(this.state.topicsOptions)}
                                </select>
                            </span>
                            <span className="custom-dropdown">
                                <select
                                    id="card-filter-option3"
                                    defaultValue="no topic"
                                    onChange={() => this.getOptionValue(3)}
                                >
                                    {this.renderOptions(this.state.topicsOptions)}
                                </select>
                            </span>
                        </div>
                    </section>

                    <section className="filter-cards__buttons">
                        <button
                            id="filter-cards__reset-btn"
                            onClick={() => this.resetState()}
                        >Reset</button>

                        <button
                            id="filter-cards__filter-btn"
                            onClick={() => { this.submit() }}
                        >Filter Cards</button>
                    </section>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of FilterCards