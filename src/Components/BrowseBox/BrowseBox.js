import React, { Component } from "react";

import "./BrowseBox.css";

export default class BrowseBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCard: this.randomCard(),
            questionIsUp: true
        };
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
        this.setState({
            currentCard: this.randomCard(),
            questionIsUp: true
        }); // end of setState
    } // end of prevClickHandler

    nextClickHandler() {
        this.setState({
            currentCard: this.randomCard(),
            questionIsUp: true
        }); // end of setState
    } // end of prevClickHandler

    turnClickHandler() {
        // set state to turn card
        this.setState({
            currentCard: this.state.currentCard, // card doesn't change
            questionIsUp: this.state.questionIsUp ? false : true // toggle question / answer
        }); // end of setState
    } // end of turnClickHandler

    setProgress = () => {
        const [correctAnswers, totalAnswers] = Array.from(this.state.currentCard.results);

        return Math.round((correctAnswers / totalAnswers) * 100) + "%";
    } // end of setProgress

    render() {

        return (
            this.props.visible
                ?
                <div className="browse-box">
                    <div className="browse-box__header"></div>

                    <div className="browse-box__body">
                        {this.state.questionIsUp ? this.state.currentCard.question : this.state.currentCard.answer}
                    </div>

                    <div className="browse-box__footer">
                        <div className="browse-box__footer__progress-box">
                            <div className="browse-box__footer__progress-box__text">
                                {(this.state.currentCard.results + "").replace(/,/g, "/")}
                            </div>
                            <div className="browse-box__footer__progress-box__progress">
                                <div className="browse-box__footer__progress-bar">
                                    <div
                                        className="browse-box__footer__progress"
                                        style={{ width: this.setProgress() }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="browse-box__footer__button-box">
                            <button
                                id="browse-box__prev-btn"
                                onClick={() => this.prevClickHandler()}
                            >Prev</button>

                            <button
                                id="browse-box__turn-btn"
                                onClick={() => this.turnClickHandler()}
                            >Turn</button>

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