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



    selectTestTopic(topicSelector, topicInd) {

        console.log(topicSelector, topicInd);
        const selectedItem = document.querySelector(".test__topic-list--" + topicSelector + ">li#test__topic--" + topicInd);

        // check if item has been selected, in that case deselect
        ([...selectedItem.classList].find(cl => cl === "test__topic-list__item--selected"))
            ? selectedItem.classList.remove("test__topic-list__item--selected")
            : selectedItem.classList.add("test__topic-list__item--selected");

        console.log(selectedItem);
    } // end of selectTestTopic



    renderTopics(topicSelector) {
        return (
            <ul className={"test__topic-list--" + topicSelector}>
                {this.state[topicSelector].map((topic, i) =>
                    <li className={"test__topic-list__item"}
                        id={"test__topic--" + i}
                        key={i}
                        onClick={() => this.selectTestTopic(topicSelector, i)}>
                        <TopicLabel
                            text={topic.name}
                            color={topic.color} />
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
                        <button
                            id="test__select-btn"
                            onClick={() => this.swapTopicItems("availableTopics", "selectedTopics")}
                        >&gt;</button>

                        <button
                            id="test__deselect-btn"
                            onClick={() => this.swapTopicItems("selectedTopics", "availableTopics")}
                        >&lt;</button>
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