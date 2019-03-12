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
            "removeNum": 0
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
        console.log(event);
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
        console.log("REMOVE", name, numOfCards);
    } // end of removeTopic


    closeRemoveMsg() {
        console.log("CLOSE");
        const newState = this.state;

        newState.removeMsgVisible = false;

        this.setState(newState);

    } // end of closeRemoveMsg


    openRemoveMsg(event) {
        console.log("OPEN");
        const newState = this.state;

        newState.removeMsgVisible = true;

        this.setState(newState);
        event.stopPropagation(); // further event bubbling would close the msg, outer div click closes the msg div
    } // end of toggleRemoveMsg



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
                            <button onclick={() => this.removeTopicFromCard()}>Yes</button>
                            <button>No</button>
                        </div>
                    </div>

                }
                <div className="topics-box">
                    <div className="topics-box__topic-list-box">
                        <ul> {this.renderTopics()} </ul>
                    </div>

                    <div className="topics-box__buttons">
                        <button onClick={() => this.changeView("add-topic")}>Add</button>

                        <button onClick={() => this.toggleRemoveButtons()}>Remove</button>

                        <button>Back</button>
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