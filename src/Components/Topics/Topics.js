import React, { Component } from "react";

import "./Topics.css";

import TopicLabel from "../TopicLabel/TopicLabel";
import AddTopic from "../AddTopic/AddTopic";

export default class Topics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "view": "none",
            "removeButtonsVisible": false,
            "removeMsgVisible": false,
            "removeName": "",
            "removeNum": 0,
            "sortby": "created",
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

    renderTopics() {
        const topics = JSON.parse(localStorage.topics);

        if (topics.length) {
            const topicList = topics.map((t, i) =>
                <li key={i}>
                    <TopicLabel text={t.name} color={t.color} />
                    <div className="topic__item-misc">
                        {this.getNumOfCardsThatHasTopic(t.name)}
                        {
                            this.state.removeButtonsVisible
                                ? <button
                                    className={"topic__remove-item-btn remove-topic-name--" + t.name}
                                    onClick={e => this.removeTopic(e)}
                                >&times;</button>
                                : null
                        }
                    </div>
                </li>);
            return topicList;
        } // end of if there are topics
        else { return null; }
    } // end of renderTopics



    removeTopic(event) {
        const
            target = event.target,
            name = target.classList[1].replace(/remove-topic-name--/, ""),  // second item includes the name (remove-topic-name***)
            numOfCards = this.getNumOfCardsThatHasTopic(name);

        this.openRemoveMsg(event);

        // set new state
        const newState = this.state;

        newState.removeName = name;
        newState.removeNum = numOfCards;

        this.setState(newState);
    } // end of removeTopic


    closeRemoveMsg() {
        const newState = this.state;

        newState.removeMsgVisible = false;
        newState.removeName = "";
        newState.removeNum = 0;

        this.setState(newState);
    } // end of closeRemoveMsg


    openRemoveMsg(event) {
        const newState = this.state;

        newState.removeMsgVisible = true;

        this.setState(newState);
        event.stopPropagation(); // further event bubbling would close the msg, outer div click closes the msg div
    } // end of toggleRemoveMsg



    removeTopicFromCard(event) {
        event.stopPropagation(); // the msg div will be closed by the function, so we can be sure state won't change while function runs

        if (this.state.removeNum > 0) {
            // REMOVE TOPIC FROM CARDS
            let cards = JSON.parse(localStorage.cards);

            console.log("CARDS");
            cards = cards.length && cards.map(c => {
                const cardTopics = c.topics;

                c.topics = cardTopics.filter(ct => ct !== this.state.removeName);
                console.log(cardTopics);
                return c;
            }); // end of card iteration

            localStorage.setItem("cards", JSON.stringify(cards));
        } // end of if any card holds the topic to be removed

        // REMOVE TOPIC
        const
            topics = JSON.parse(localStorage.topics),
            index = topics.findIndex(e => e.name === this.state.removeName);

        topics.splice(index, 1);

        localStorage.setItem("topics", JSON.stringify(topics));

        this.closeRemoveMsg(); // here msg is closed by function, not by event bubbling
    } // end of removeTopicFromCards


    changeView(newView = "none") {
        // set view to add

        const newState = this.state;

        newState.view = newView;

        this.setState(newState);
    } // end of addTopicClickHandler



    toggleRemoveButtons() {
        const newState = this.state;

        // toggle remove button visibility
        newState.removeButtonsVisible = newState.removeButtonsVisible ? false : true;

        // reset remove features
        newState.removeName = "";
        newState.removeNum = 0;

        this.setState(newState);
    } // end of toggleRemoveButtons


    changeSortBy(newSortby) {
        console.log(newSortby);
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
    } // end of changeSortBy



    renderSortButton(sortby) {
        console.log(this.state.sortby === sortby);
        return (
            <button
                className={"topics-box__header__" + { sortby } + (this.state.sortby === sortby ? " topics-box__header--active" : "")}
                onClick={() => this.changeSortBy(sortby)}
            >
                {sortby}
                {this.state.sortby === sortby && (this.state.ascending ? <span>&#9650;</span> : <span>&#9660;</span>)}
            </button>
        ) // end of return
    } // end of renderSortButton



    render() {
        return (
            <div
                className="topics"
                style={{ display: this.props.visible ? "block" : "none" }}
                onClick={() => this.closeRemoveMsg()}
            >
                {
                    this.state.removeMsgVisible &&
                    <div className="remove-msg">
                        {
                            this.state.removeNum
                                ? "If you remove " + this.state.removeName
                                + " topic, the topic will be deleted from " + this.state.removeNum
                                + " card" + (this.state.removeNum > 1 ? "s" : "")
                                + " that featured it. Are you sure you want to remove " + this.state.removeName + "?"
                                : "No card has " + this.state.removeName + " topic added yet. Do you want to remove it?"
                        }
                        <div className="remove-item__button-box">
                            <button onClick={e => this.removeTopicFromCard(e)}>Yes</button>

                            {/* No need for onclick event on NO button, event bubbling will close the msg. */}
                            <button>No</button>
                        </div>
                    </div>
                }
                <div className="topics-box">
                    <div className="topics-box__header">
                        <span className="topics-box__header__text">Sort by: </span>

                        {this.renderSortButton("name")}

                        {this.renderSortButton("cards")}

                        {this.renderSortButton("created")}
                    </div>

                    <div className="topics-box__topic-list-box">
                        <ul> {this.renderTopics()} </ul>
                    </div>

                    <div className="topics-box__buttons">
                        <button onClick={() => this.changeView("add-topic")}>Add</button>

                        <button onClick={() => this.toggleRemoveButtons()}>Remove</button>

                        <button onClick={() => this.props.changeView("browse")}>Back</button>
                    </div>

                    <AddTopic
                        visible={this.state.view === "add-topic"}
                        closeAddTopic={this.changeView.bind(this)}
                    />
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of topics