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



    handleCreateTopicBtnClick() {
        if (this.state.topicName.length) {
            const
                topics = JSON.parse(localStorage.topics),
                colors = ["#ffffff", "#ffff79", "#ffca79", "#ff9dce", "#ff8080", "#ff80ff", "#bdbbff", "#9fffff", "#b3ffb3", "#d6adad"];


            topics.push({
                "name": this.state.topicName,
                "color": colors[this.state.selectedColor]
            }); // end of topics object declaration

            localStorage.setItem("topics", JSON.stringify(topics));

            this.closeAddPanel();
        } // end of if topic input has any value
    } // end of handleCreateTopicBtnClick



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

        // if topic exists header text changes and create button disappears
        if (topicExists) {
            document.getElementById("add-topic__topic-msg").style.visibility = "visible";
            document.getElementById("add-topic__create-btn").style.visibility = "hidden";
        } // end of if topic exists
        else {
            document.getElementById("add-topic__topic-msg").style.visibility = "hidden";
            document.getElementById("add-topic__create-btn").style.visibility = "visible";
        } // end of if topic doesn't exist

        // reset state
        let newState = this.state;

        newState.topicName = topicExists ? "" : input.value;

        this.setState(newState);
    } // end of setTopicName




    closeAddPanel() {
        // set state back to default
        this.setState({
            selectedColor: 0,
            topicName: ""
        });

        this.props.closeAddTopic();
    } // end of closeAddTopic



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
        if (this.props.visible)
            return (
                <div className="add-topic">
                    <div className="add-topic__header">
                        Add topic
                    <span id="add-topic__topic-msg">/ topic name exists!</span>
                        <button
                            id="cancel-add-topic-btn"
                            onClick={() => this.closeAddPanel()}
                        >&times;</button>
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

                            <button
                                id="add-topic__create-btn"
                                onClick={() => this.handleCreateTopicBtnClick()}
                            >Create topic</button>
                        </div>
                    </div>
                </div>
            ); // end of return
        else return null;
    } // end of render
} // end of AddTopic