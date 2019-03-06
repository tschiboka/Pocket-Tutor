import React, { Component } from "react";

import "./AddTopic.css";

export default class AddTopic extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedColor: 0,
            topicName: ""
        };
    }

    handlePaletteClick(ind) {
        let newState = this.state;

        newState.selectedColor = ind;

        this.setState(newState);
        console.log(ind, " CLICKED", newState);
    } // end of handlePaletteClick

    setTopicName() {
        let newTopicName = "";

        const input = document.getElementById("add-topic__name-input");

        // disabling special characters
        newTopicName = input.value.replace(/[^\w ]/g, ""); // don't let special chararters appear in input

        input.value = newTopicName;

        // if topicName exist input text becomes red
        const topicExists = JSON
            .parse(localStorage.topics) // string to object
            .map(t => t.name.toLowerCase() === input.value.toLowerCase())  // iterate over topics and find out if value exists
            .some(el => !!el);

        input.classList = topicExists ? "topic--exists" : "";

        // reset state
        let newState = this.state;

        newState.topicName = topicExists ? "" : input.value;

        this.setState(newState);
    } // end of setTopicName

    renderPalette() {
        const
            colors = ["#ffffff", "#ffff79", "#ffca79", "#ff9dce", "#ff8080", "#ff80ff", "#bdbbff", "#9fffff", "#b3ffb3", "#d6adad"],
            palette = colors.map((co, i) => {
                const
                    className = "add-topic__color" + (i === this.state.selectedColor ? " add-topic__color--selected" : ""),
                    key = "palette" + i;

                return (
                    <div
                        className={className}
                        key={key}
                        style={{ "backgroundColor": co }}
                        autoFocus={true}
                        tabIndex={1}
                        onClick={() => this.handlePaletteClick(i)}
                    >&#10004;</div>
                );
            });

        return palette;
    } // end of renderPalette

    render() {
        return (
            <div className="add-topic">
                <div className="add-topic__header">
                    Add topic

                    <button id="cancel-add-topic-btn">&times;</button>
                </div>
                <div className="add-topic__body">
                    <div className="add-topic__palette">{this.renderPalette()}</div>

                    <div className="add-topic__name">
                        <input
                            id="add-topic__name-input"
                            placeholder="Add topic name"
                            maxLength="30"
                            onChange={() => this.setTopicName()}
                        />

                        <button id="add-topic__create-btn">Create topic</button>
                    </div>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of AddTopic