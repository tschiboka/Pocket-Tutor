import React, { Component } from "react";

import "./Topics.css";

import TopicLabel from "../TopicLabel/TopicLabel";
import AddTopic from "../AddTopic/AddTopic";

export default class Topics extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "view": "none",
            "removeButtonsVisible": false
        }
    } // end of constructor



    renderTopics() {
        const topics = JSON.parse(localStorage.topics);

        if (topics.length) {
            const topicList = topics.map((t, i) =>
                <li key={i}>
                    <TopicLabel text={t.name} color={t.color} />
                    <div className="topic__item-misc">
                        {
                            JSON.parse(localStorage.cards).length ?
                                JSON.parse(localStorage.cards).map(c =>
                                    c.topics.find(el => el === t.name) ? 1 : 0
                                ).reduce((prev, acc) => prev + acc)
                                : "0"
                        }
                        {this.state.removeButtonsVisible
                            ? <button
                                className={"topic__remove-item-btn name--" + t.name}
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
        console.log("REMOVE", event.target);
    }


    changeView(newView = "none") {
        // set view to add

        const newState = this.state;

        newState.view = newView;

        this.setState(newState);
    } // end of addTopicClickHandler


    toggleRemoveButtons() {
        const newState = this.state;

        if (this.state.removeButtonsVisible) { newState.removeButtonsVisible = false; }
        else { newState.removeButtonsVisible = true; }

        this.setState(newState);
    } // end of toggleRemoveButtons


    render() {
        return (
            <div
                className="topics"
                style={{ display: this.props.visible ? "block" : "none" }}
            >
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