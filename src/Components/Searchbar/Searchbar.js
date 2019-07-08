import React, { Component } from "react";

import "./searchbar.css";

export default class Searchbar extends Component {
    constructor(props) {
        super(props);

        this.state = { "searchResults": [] }; // going to be an array of result objects
    } // end of constructor



    componentDidMount() { this.setAutoCompleteHeight(); }



    componentDidUpdate() { this.setAutoCompleteHeight(); }



    setAutoCompleteHeight() {
        const
            resultsDiv = document.getElementById("searchbar__results"), // get results div
            resultsLen = this.state.searchResults.length,               // get results length
            divsHeight = (resultsLen >= 3 ? 3 : resultsLen) * 6 + "%";  // cant be larger than 3 items

        resultsDiv.style.height = divsHeight;
    } // end of setAutoCompleteHeight



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
        console.log(JSON.stringify(this.state));
        return this.state.searchResults.map((item, i) => (
            <div
                key={i}
                id={"searchbar__autocomplete--" + item.id}
                className="searchbar__autocomplete">
                <span>{item.search}</span>
                <span>{item.id + item.QA}</span>
            </div>)); // end of map searchResults
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

                {<div id="searchbar__results">{this.renderSearchResults()}</div>}
            </div>
        ); // end of return
    } // end of render
} // end of Searchbar