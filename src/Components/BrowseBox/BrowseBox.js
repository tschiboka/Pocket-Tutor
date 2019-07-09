import React, { Component } from "react";

import "./BrowseBox.css";

import TopicLabel from "../TopicLabel/TopicLabel";
import Card from "../Card/Card";

export default class BrowseBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "currentCard": 0,
            "questionIsUp": true,
        };
    } // end of constructor




    componentWillReceiveProps(nextProps) {
        // if props ids changed, reset current
        const sameIds = nextProps.cardIds.every((c, i) => this.props.cardIds[i] === c);

        if (sameIds) return void (0);

        console.log("here", sameIds);

        const newState = this.state;
        newState.currentCard = 0;
        this.setState(newState);
    } // end of componentWillReceiveProps



    prevClickHandler() {
        const newState = this.state;
        newState.currentCard--;
        this.setState(newState);
    } // end of prevClickHandler



    nextClickHandler() {
        const newState = this.state;
        newState.currentCard++;
        this.setState(newState);
    } // end of prevClickHandler



    turnClickHandler() {
        const newState = this.state;
        newState.questionIsUp = !newState.questionIsUp; // toggle question / answer
        this.setState(newState);
    } // end of turnClickHandler



    setProgress = (card) => {
        if (card) {
            const [correctAnswers, totalAnswers] = Array.from(card.results);

            return (totalAnswers ? Math.round((correctAnswers / totalAnswers) * 100) : 0) + "%";
        }
        else return "0";
    } // end of setProgress



    renderTopics(card) {
        const topics = [], colors = [];

        // extract topics
        if (card) {
            if (card.topics && Array.isArray(card.topics)) {
                // max 3 topics allowed
                for (let i = 0; i < 3; i++) {
                    if (card.topics[i]) topics.push(card.topics[i]);
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
        const elems = topics.map((t, i) => t ? <TopicLabel text={t} color={colors[i]} key={i} /> : "");
        return elems;
    } // end of renderTopics



    render() {
        const card = JSON
            .parse(localStorage.cards)
            .find(c => c.id === this.props.cardIds[this.state.currentCard]);
        return (
            this.props.visible && <div className="browse-box">
                <div className="browse-box__info">
                    {this.props.order === "selection"
                        ? <div className="browse-box__search-info">{"Result on search \"" + this.props.keyWord + "\" (" + (this.state.currentCard + 1) + "/" + this.props.cardIds.length + ")"}</div>
                        : <div className="browse-box__search-info">{"All cards (" + (this.state.currentCard + 1) + "/" + this.props.cardIds.length + ")"}</div>
                    }

                    <button
                        className="browse-box__close-search-btn"
                        disabled={this.props.order === "default"}
                        onClick={() => this.props.reset()}>
                        &times;</button>

                </div>

                <div className="browse-box__header">
                    {this.renderTopics(card)}
                </div>
                <div className="browse-box__body">
                    {card
                        ? <Card turned={!this.state.questionIsUp} card={card} />
                        : "No cards to show"}
                </div>

                <div className="browse-box__footer">
                    <div className="browse-box__footer__progress-box">
                        <button
                            onClick={() => this.props.openCloseEditCards(true, card.id)}
                            className="browse-box__footer__progress-box__edit"
                            disabled={!card}
                        >Edit</button>

                        <div className="browse-box__footer__progress-box__progress">
                            <div className="browse-box__footer__progress-bar">
                                <div
                                    className="browse-box__footer__progress"
                                    style={{ width: this.setProgress(card) }}
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div className="browse-box__footer__button-box">
                        <button
                            id="browse-box__prev-btn"
                            onClick={() => this.prevClickHandler()}
                            disabled={!this.props.cardIds[this.state.currentCard - 1]}
                        >Prev</button>

                        <button
                            id="browse-box__turn-btn"
                            onClick={() => this.turnClickHandler()}
                            disabled={!this.props.cardIds[this.state.currentCard]}
                        >Turn</button>

                        <button
                            id="browse-box__next-btn"
                            onClick={() => this.nextClickHandler()}
                            disabled={!this.props.cardIds[this.state.currentCard + 1]}
                        >Next</button>
                    </div>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of BrowseBox