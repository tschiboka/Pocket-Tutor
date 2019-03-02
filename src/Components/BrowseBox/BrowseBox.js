import React, { Component } from "react";

import "./BrowseBox.css";

import TopicLabel from "../TopicLabel/TopicLabel";

export default class BrowseBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCard: this.randomCard(),
            questionIsUp: true
        };
    } // end of constructor

    randomCard() {
        if (localStorage.cards) {
            const
                cardsLength = JSON.parse(localStorage.cards).length,
                RAN = Math.floor(Math.random() * cardsLength);

            return JSON.parse(localStorage.cards)[RAN];
        }
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
        if (this.state.currentCard) {
            const [correctAnswers, totalAnswers] = Array.from(this.state.currentCard.results);

            return Math.round((correctAnswers / totalAnswers) * 100) + "%";
        }
        else {
            return "0";
        }
    } // end of setProgress

    renderTopics() {
        const
            CARD = this.state.currentCard,
            topics = [],
            colors = [];

        // extract topics
        if (CARD) {
            if (CARD.topics && Array.isArray(CARD.topics)) {
                // max 3 topics allowed
                for (let i = 0; i < 3; i++) {
                    if (CARD.topics[i]) topics.push(CARD.topics[i]);
                } // end of for 3
            } // end of there are topics
        } // end of there is a valid card

        topics.forEach(t => {
            // get the corrisponding color if any
            const color = JSON
                .parse(localStorage.topics)
                .map(topic => topic.name === t ? topic.color : null)
                .filter(el => el)
                .join(",");
            colors.push(color ? color : "transparent");
        });
        const elems = topics.map((t, i) => t ? <TopicLabel text={t} color={colors[i]} /> : "");
        return elems;
    } // end of renderTopics

    render() {

        return (
            this.props.visible
                ?
                <div className="browse-box">
                    <div className="browse-box__header">
                        {this.renderTopics()}
                    </div>

                    <div className="browse-box__body">
                        {this.state.currentCard
                            ? (this.state.questionIsUp ? this.state.currentCard.question : this.state.currentCard.answer)
                            : "No cards to show"}
                    </div>

                    <div className="browse-box__footer">
                        <div className="browse-box__footer__progress-box">
                            <div className="browse-box__footer__progress-box__text">
                                {this.state.currentCard
                                    ? (this.state.currentCard.results + "").replace(/,/g, "/")
                                    : "---"}
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