import React, { Component } from "react";

import "./searchbar.css";

export default class Searchbar extends Component {
    constructor(props) {
        super(props);

        this.state = { "searchResults": [] }; // going to be an array of result objects
    } // end of constructor



    autocompleteSearchBar() {
        const input = document.getElementById("searchbar-input").value; // get current search input value

        // return from function if input length is too short avoiding unneccesary computation
        if (input.length <= 2) {
            this.setState({ "searchResults": [] }); // set empty state back
            return void (0);
        } // end of if

        const
            localSt = JSON.parse(localStorage.cards),                          // get cards
            results = localSt.map(card => {                                    // iterate over cards
                const
                    regExp = new RegExp(".{0,20}" + input + ".{0,20}", "gmi"), // the search and any 20 chars before or after
                    question = card.question.match(regExp),                    // find search in questions
                    answer = card.answer.match(regExp);                        // find search in answers

                // return an object with id, question/answer and search results
                if (question) return { "id": card.id, "QA": "Q", "search": question[0] };
                if (answer) return { "id": card.id, "QA": "A", "search": answer[0] };
            }).filter(c => !!c); // get rid of undefined values

        // set component state
        const newState = this.state;
        newState.searchResults = results;
        this.setState(newState);
    } // end of autocompleteSearchBar



    renderSearchResults() {

    } // end of renderSearchResults



    render() {
        return (
            <div className="searchbar-container">
                <input
                    id="searchbar-input"
                    type="text"
                    maxLength="30"
                    autoFocus={false}
                    onChange={() => this.autocompleteSearchBar()}
                    placeholder="Search cards content" />

                <button><div>&#9906;</div></button>

                {this.state.searchResults.length ? <div className="searchbar__results">{this.renderSearchResults()}</div> : void (0)}
            </div>
        ); // end of return
    } // end of render
} // end of Searchbar