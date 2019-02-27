import React, { Component } from "react";

import "./BrowseBox.css";

export default class BrowseBox extends Component {
    constructor(props) {
        super(props);
        this.state = { currentCard: this.randomCard() };
    } // end of constructor

    randomCard() {
        const
            cardsLength = JSON.parse(localStorage.cards).length,
            RAN = Math.floor(Math.random() * cardsLength);

        return JSON.parse(localStorage.cards)[RAN];
    } // end of randomCard


    // prev and next click handlers are temporaly solutions, cards can coome in different order
    // rather than random in the later development of the app
    prevClickHandler() {
        this.setState({ currentCard: this.randomCard() });
    } // end of prevClickHandler

    nextClickHandler() {
        this.setState({ currentCard: this.randomCard() });
    } // end of prevClickHandler


    render() {
        return (
            this.props.visible
                ?
                <div className="browse-box">
                    <div className="browse-box__header"></div>

                    <div className="browse-box__body">
                        {this.state.currentCard.question}
                    </div>

                    <div className="browse-box__footer">
                        <div className="browse-box__footer__progress-box"></div>

                        <div className="browse-box__footer__button-box">
                            <button
                                id="browse-box__prev-btn"
                                onClick={() => this.prevClickHandler()}
                            >Prev</button>

                            <button id="browse-box__turn-btn">Turn</button>

                            <button
                                id="browse-box__next-btn"
                                onClick={() => this.nextClickHandler()}
                            >Next</button>
                        </div>
                    </div>
                </div>
                : null
        ); // end of return
    } // end of render
} // end of BrowseBox