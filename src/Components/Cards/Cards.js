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
            "filtersApplied": "none", // alternatively if filter is set {range:[x, y], topics:["topic1", "topic2", "topic3"]}
            "deleteConfirmVisible": false,
            "deleteId": 0
        } // end of state declaration
    } // end of constructor



    toggleFilterCardsPanel(isVisible = false) {
        console.log("CLOSE FILTER CARDS");
        const newState = this.state;

        newState.filterCardsPanelVisible = isVisible;

        this.setState(newState);
    } // end of closeFilterCards



    renderCards(filters) {
        let cards = JSON.parse(localStorage.cards);

        // add add percent as a property to cards
        cards.map(c => c.results[1] ? Math.round(c.percentage = ((c.results[0] / c.results[1])) * 100) : c.percentage = 0);

        // FILTER CARDS
        filters !== "none" && // only runs when filters set
            (cards = cards.filter(card => (
                (card.percentage >= filters.range[0]) && // upper range
                (card.percentage <= filters.range[1]) && // lower range
                (!filters.topics.length ||             // if topic set at all 
                    filters.topics.filter(ft => card.topics.includes(ft)).length) // intersection of topics on card and filter
            ))); // end of filter

        console.log(filters, cards);
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
                        remove={this.removeCardConfirm.bind(this)}
                        edit={() => this.openEditCards(true, c.id)}
                    />
                </li>);
            return cardsList;
        } // end of if there are topics
        else { return null; }
    } // end of renderCards    



    openEditCards(isOpen, id) {
        this.props.openCloseEditCards(isOpen, id);
    } // end of openEditCards



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



    removeCardConfirm(id) {
        console.log("REMOVE");
        const newState = this.state;

        newState.deleteConfirmVisible = true;
        newState.deleteId = id;

        this.setState(newState);
    } // end of removeCardConfirm


    removeCard(id) {
        let cards = JSON.parse(localStorage.cards);

        cards = cards.filter(c => c.id !== id);

        localStorage.setItem("cards", JSON.stringify(cards));

        this.closeRemoveConfim();

        this.forceUpdate();
    } // end of removeCard


    submitFilter(range, selectedTopics) {
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
    } // end of submitFilter



    closeRemoveConfim() {
        const newState = this.state;

        newState.deleteConfirmVisible = false;

        this.setState(newState);
    } // end of closeRemoveConfirm



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
                        <ul>{this.renderCards(this.state.filtersApplied)}</ul>
                    </div>

                    <div className="cards__button-box">
                        <button onClick={() => this.props.openCloseEditCards(true, null)}>Create</button>

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
                    {
                        this.state.deleteConfirmVisible &&
                        <div className="cards__delete-confirm">
                            Are you sure you want to delete this card?
                            <br />
                            card id: {this.state.deleteId}

                            <div className="cards__delete-confirm__button-box">
                                <button onClick={() => this.removeCard(this.state.deleteId)}>Yes</button>

                                <button onClick={() => this.closeRemoveConfim()}>No</button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        ); // end of retrun
    } // end of render
} // end of Cards