import React, { Component } from "react";

import "./Cards.css";

import CardThumbnail from "../ChardThumbnail/CardThumbnail";

export default class Cards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "sortby": "id",
            "ascending": true
        } // end of state declaration
    } // end of constructor



    renderCards() {
        let cards = JSON.parse(localStorage.cards);


        // SORT CARDS
        switch (this.state.sortby) {
            case "results": { break; }

            default: { } // react expects defult
        } // end of switch

        // reverse if not ascending
        if (!this.state.ascending) { cards = cards.reverse(); }


        console.log(cards);
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

                        <button>Filter</button>

                        <button>Back</button>
                    </div>
                </div>
            </div>
        ); // end of retrun
    } // end of render
} // end of Cards