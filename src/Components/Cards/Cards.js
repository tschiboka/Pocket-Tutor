import React, { Component } from "react";

import "./Cards.css";

export default class Cards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "sortby": "id",
            "ascending": true
        } // end of state declaration
    } // end of constructor



    getNumOfCardsThatHasTopic(topicName) {
        const
            cards = JSON.parse(localStorage.cards),  // parse cards into obj
            numOfCards = cards.length // in case it was not declared or deleted
                ? cards.map(c => c.topics.find(el => el === topicName) ? 1 : 0) // find topic and return an array
                    .reduce((prev, acc) => prev + acc) // reduce arr into the sum
                : 0;

        return numOfCards;
    } // end of getNumOfCardsThatHasTopic



    renderCards() {
        let cards = JSON.parse(localStorage.cards);

        // add to topics a number property
        cards = cards.map(t => {
            t.number = this.getNumOfCardsThatHasTopic(t.name);
            return t;
        });

        // SORT TOPICS
        switch (this.state.sortby) {
            case "name": { cards = cards.sort((accu, curr) => accu.name > curr.name); break; }

            case "cards": { cards = cards.sort((accu, curr) => accu.number > curr.number); break; }

            default: { } // react expects defult
        } // end of switch

        // reverse if not ascending
        if (!this.state.ascending) { cards = cards.reverse(); }

        // create JSX
        if (cards.length) {
            const cardsList = cards.map((c, i) =>
                <li key={i}>

                </li>);
            return cardsList;
        } // end of if there are topics
        else { return null; }
    } // end of renderTopics    



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
                className={"cards__header__" + { sortby } + (this.state.sortby === sortby ? " topics__header--active" : "")}
                onClick={() => this.changeSortBy(sortby)}
            >
                {sortby}
                {this.state.sortby === sortby && (this.state.ascending ? <span>&#9650;</span> : <span>&#9660;</span>)}
            </button>
        ) // end of return
    } // end of renderSortButton


    render() {
        return (
            this.props.visible &&
            <div className="cards">
                <div className="cards-box">
                    <div className="cards__header">
                        <span className="cards__header__text">Sort by: </span>

                        {this.renderSortButton("name")}

                        {this.renderSortButton("cards")}

                        {this.renderSortButton("created")}
                    </div>

                    <div className="cards__body">{this.renderCards()}</div>

                    <div className="cards__button-box">
                        <button>Create</button>

                        <button>Filter</button>

                        <button>Back</button>
                    </div>
                </div>
            </div>
        ); // end of retrun
    } // end of render
} // end of Cards