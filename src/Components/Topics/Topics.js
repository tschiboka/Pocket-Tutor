import React, { Component } from "react";

import "./Topics.css"
import TopicLabel from "../TopicLabel/TopicLabel";

export default class Topics extends Component {
    renderTopics() {
        const topics = JSON.parse(localStorage.topics);
        const topicList = topics.map((t, i) => <li><TopicLabel text={t.name} color={t.color} key={i} /></li>);
        console.log(topicList);
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