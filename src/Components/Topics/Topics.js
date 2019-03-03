import React, { Component } from "react";

import "./Topics.css";

import TopicLabel from "../TopicLabel/TopicLabel";
import AddTopic from "../AddTopic/AddTopic";

export default class Topics extends Component {
    constructor(props) {
        super(props);
    } // end of constructor

    renderTopics() {
        const topics = JSON.parse(localStorage.topics);

        const topicList = topics.map((t, i) =>
            <li key={i}>
                <TopicLabel text={t.name} color={t.color} />
                {
                    JSON.parse(localStorage.cards).map(c =>
                        c.topics.find(el => el === t.name) ? 1 : 0
                    ).reduce((prev, acc) => prev + acc)
                }
            </li>);
        return topicList;
    } // end of renderTopics

    addTopicClickHandler() {
        console.log("CLICK");
    } // end of addTopicClickHandler

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
                        <button onClick={() => this.addTopicClickHandler()}>Add</button>

                        <button>Filter</button>

                        <button>Remove</button>
                    </div>
                    <AddTopic />
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of topics