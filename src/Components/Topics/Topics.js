import React, { Component } from "react";

import "./Topics.css"
import TopicLabel from "../TopicLabel/TopicLabel";

export default class Topics extends Component {
    renderTopics() {
        const topics = JSON.parse(localStorage.topics);
        const topicNums = topics.map(t =>
            JSON.parse(localStorage.cards).map(c =>
                c.topics.find(el => el === t.name) ? 1 : 0
            ).reduce((prev, acc) => prev + acc)
        );
        console.log(topicNums);
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
    }

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
                        <button>Add</button>

                        <button>Filter</button>

                        <button>Remove</button>
                    </div>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of topics