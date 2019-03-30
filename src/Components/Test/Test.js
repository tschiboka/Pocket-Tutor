import React, { Component } from "react";

import "./Test.css";

import TopicLabel from "../TopicLabel/TopicLabel";

export default class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "availableTopics": JSON.parse(localStorage.topics),
            "selectedTopics": []
        } // end of state declaration
    } // end of constructor



    renderTopics(topicSelector) {
        return (
            <ul className={"test__topic-list--" + topicSelector}>
                {this.state[topicSelector].map((topic, i) =>
                    <li className="test__topic">
                        <TopicLabel
                            text={topic.name}
                            color={topic.color}
                            key={i} />
                    </li>
                ) /* end of topicSelector map*/}
            </ul>
        ); // end of return list
    } // end of renderTopics



    render() {
        return (
            this.props.visible &&
            <div className="test">
                <div className="test__header">Test settings</div>

                <div className="test__topics-box">
                    <div className="test__available-topics-box">
                        <div className="test__available-topics__header">Topics</div>

                        <div className="test__available-topics">{this.renderTopics("availableTopics")}</div>
                    </div>

                    <div className="test__topics-btn-box">
                        <button id="test__select-btn">&gt;</button>

                        <button id="test__deselect-btn">&lt;</button>
                    </div>

                    <div className="test__selected-topic-box">
                        <div className="test__selected-topics__header">Selected</div>

                        <div className="test__selected-topics">{this.renderTopics("selectedTopics")}</div>
                    </div>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of Test