import React, { Component } from "react";

import "./Cards.css";

import CardThumbnail from "../CardThumbnail/CardThumbnail";
import FilterCards from "../FilterCards/FilterCards";

export default class Cards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "sortby": "id",
            "ascending": true,
            "filterCardsPanelVisible": false,
            "filtersApplied": "none" // alternatively if filter is set {range:[x, y], topics:["topic1", "topic2", "topic3"]}
        } // end of state declaration
    } // end of constructor



    toggleFilterCardsPanel(isVisible = false) {
        console.log("CLOSE FILTER CARDS");
        const newState = this.state;

        newState.filterCardsPanelVisible = isVisible;

        this.setState(newState);
    } // end of closeFilterCards



    renderCards() {
        let cards = JSON.parse(localStorage.cards);

        // add add percent as a property to cards
        cards.map(c => {
            Math.round(c.percentage = ((c.results[0] / c.results[1])) * 100);
            return c;
        });

        // SORT CARDS
        if (this.state.sortby === "results") { cards = cards.sort((a, b) => a.percentage - b.percentage); }

        // reverse if not ascending
        if (!this.state.ascending) { cards = cards.reverse(); }


        // create JSX
        if (cards.length) {
            const cardsList = cards.map((c, i) =>
                <li key={i}>
                    <CardThumbnail
                        id={c.id}
                        remove={this.removeCard.bind(this)}
                    />
                </li>);
            return cardsList;
        } // end of if there are topics
        else { return null; }
    } // end of renderCards    



    changeSortBy(newSortby) {
        if (newSortby === this.state.sortby) {
            // change direction
            const newState = this.state;

            newState.ascending = newState.ascending ? false : true; // toggle ascending / descending

            this.setState(newState);
        } // end of if sortby was the same as before
        else {
            // change sort by to the parameter given by the function
            const newState = this.state;

            newState.sortby = newSortby;

            this.setState(newState);
        } // end of if sortby was different than before

        this.forceUpdate();
    } // end of changeSortBy



    renderSortButton(sortby) {
        return (
            <button
                className={"cards__header__" + sortby + (this.state.sortby === sortby ? " cards__header--active" : "")}
                onClick={() => this.changeSortBy(sortby)}
            >
                {sortby}

                {this.state.sortby === sortby && (this.state.ascending ? <span>&#9650;</span> : <span>&#9660;</span>)}
            </button>
        ) // end of return
    } // end of renderSortButton



    removeCard(id) {
        console.log("REMOVE CARD");
        let cards = JSON.parse(localStorage.cards);

        cards = cards.filter(c => c.id !== id);

        localStorage.setItem("cards", JSON.stringify(cards));

        this.forceUpdate();
    } // end of removeCard



    submitFilter(range, selectedTopics) {
        console.log("SUBMIT", range, selectedTopics);

        let filterApplied = {};

        // if range [0, 100] and selectedTopics ["", "", ""] let filterApplied to be "none"

        // no topic boils down to ""
        let filterTopics = selectedTopics.filter(t => t !== "no topic" && t !== "");

        // set filterApplied if it is a valid filter setting
        if (!filterTopics.length && range[0] === 0 && range[1] === 100) { filterApplied = "none" }
        else { filterApplied = { range: range, topics: filterTopics } }

        // set state
        const newState = this.state;

        newState.filtersApplied = filterApplied;

        this.setState(newState);
        console.log("FITERTOPICS", filterApplied);
    } // end of submitFilter



    render() {
        return (
            this.props.visible &&
            <div className="cards">
                <div className="cards-box">
                    <div className="cards__header">
                        <span className="cards__header__text">Sort by: </span>

                        {this.renderSortButton("id")}

                        {this.renderSortButton("results")}
                    </div>

                    <div className="cards__body">
                        <ul>{this.renderCards()}</ul>
                    </div>

                    <div className="cards__button-box">
                        <button>Create</button>

                        <button onClick={() => this.toggleFilterCardsPanel(this.state.filterCardsPanelVisible ? false : true)}>Filter</button>

                        <button onClick={() => this.props.changeView("browse")}>Back</button>
                    </div>
                    {
                        this.state.filterCardsPanelVisible &&
                        <FilterCards
                            submit={this.submitFilter.bind(this)}
                            closeFilterCards={this.toggleFilterCardsPanel.bind(this)}
                        />
                    }
                </div>
            </div>
        ); // end of retrun
    } // end of render
} // end of Cards