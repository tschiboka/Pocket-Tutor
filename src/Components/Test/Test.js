import React, { Component } from "react";

import "./Test.css";

import TopicLabel from "../TopicLabel/TopicLabel";
import RangeWithTwoSliders from "../RangeWithTwoSliders/RangeWithTwoSliders";
import RotatingButton from "../RotatingButton/RotatingButton";

export default class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "availableTopics": JSON.parse(localStorage.topics).sort((a, b) => a.name.toUpperCase() > b.name.toUpperCase()), // topics are sorted alphabeticaly
            "selectedTopics": [],
            "selectedCards": [],
            "selectedCardsNum": 0
        } // end of state declaration
    } // end of constructor



    swapTopicItems(whereFrom, whereTo) {
        const
            selectedListItems = [...document.querySelectorAll(".test__topic-list--" + whereFrom + ">li.test__topic-list__item--selected>div>span")],
            selectedTopics = selectedListItems.map(selItem => selItem.innerHTML),
            newState = this.state;

        // remove selected classes from whereFrom
        [...document.querySelectorAll(".test__topic-list--" + whereFrom + ">li.test__topic-list__item--selected")]
            .forEach(selItem => selItem.classList.remove("test__topic-list__item--selected"));

        // swap items
        for (let i = newState[whereFrom].length - 1; i >= 0; i--) {
            // remove item at the index
            if (selectedTopics.some(e => e === newState[whereFrom][i].name)) {
                newState[whereTo].push(...[...newState[whereFrom].splice(i, 1)]); // remove and push at the same time
            } // end of if item found in selected ones
        } // end of whereFrom reverse iteration (reverse is important to keep the original indexing)

        // sort lexicaly
        newState[whereTo].sort((a, b) => a.name > b.name);

        newState.selectedCards = this.selectCards(); // refresh selection

        this.setState(newState);
    } // end of swapTopicItems




    selectTestTopic(topicSelector, topicInd) {
        const selectedItem = document.querySelector(".test__topic-list--" + topicSelector + ">li#test__topic--" + topicInd);

        // check if item has been selected, in that case deselect
        ([...selectedItem.classList].find(cl => cl === "test__topic-list__item--selected"))
            ? selectedItem.classList.remove("test__topic-list__item--selected")
            : selectedItem.classList.add("test__topic-list__item--selected");
    } // end of selectTestTopic



    getSliderValues(min, max) {
        const newState = this.state;

        newState.range = [min, max];

        newState.selectedCards = this.selectCards(); // refresh selection

        this.setState(newState);
    } // end of getSliderValues



    // Select cards, considering topics and result ranges (returns an array of card objects or empty array)
    selectCards() {
        const
            cards = JSON.parse(localStorage.cards),
            topicsSelected = this.state.selectedTopics.map(t => t.name);                       // declare HERE, in filter it'd not be efficient (it won't change throughout the function)

        return cards.filter(c => {                                                             // filter relevant cards by topic and range
            const
                topicInterSection = !!c.topics.filter(t => topicsSelected.includes(t)).length, // if card has any topic from the selected ones
                range = (this.state.range || [0, 100]),                                        // in case range slider hasn't been set
                percent = c.results[1] ? Math.round((c.results[0] / c.results[1]) * 100) : 0,  // results as percentage
                rangeInterSection = percent >= range[0] && percent <= range[1];                // if cards result falls within range

            return topicInterSection && rangeInterSection;                                     // filter if BOTH range and topic matches, return the OBJECT
        }); // end of filter cards
    } // end of selectCards



    getRotatingButtonValue(value) {
        const newState = this.state;
        newState.selectedCardsNum = value;
        this.setState(newState);
    } // end of getRotatingButtonValue



    startTest() {
        if (this.state.selectedCardsNum) {
            const
                finalSelectedCards = [],
                tempSelectedCards = this.state.selectedCards.map(e => e);

            for (let i = 0; i < this.state.selectedCardsNum; i++) {
                const
                    rand = Math.floor(Math.random() * tempSelectedCards.length),
                    selectedCard = tempSelectedCards[rand];

                finalSelectedCards.push(selectedCard);

                tempSelectedCards.splice(rand, 1);
            } // end of for max numbers

            // set cards for test on <App />
            this.props.getCards(finalSelectedCards);

            // set back initial state
            this.setState({
                "availableTopics": JSON.parse(localStorage.topics).sort((a, b) => a.name > b.name), // topics are sorted alphabeticaly
                "selectedTopics": [],
                "selectedCards": [],
                "selectedCardsNum": 0
            }); // end of state declaration

            // close tab
            this.props.changeView("runtest");
        } // end of cards num greater than 0
    } // end of startTest



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



    closeTest() {
        // set back initial state
        this.setState({
            "availableTopics": JSON.parse(localStorage.topics).sort((a, b) => a.name > b.name), // topics are sorted alphabeticaly
            "selectedTopics": [],
            "selectedCards": [],
            "selectedCardsNum": 0
        }); // end of state declaration

        this.props.changeView("browse");
    } // end of closeTest



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
                        >&#9658;</button>

                        <button
                            id="test__deselect-btn"
                            onClick={() => this.swapTopicItems("selectedTopics", "availableTopics")}
                        >&#9668;</button>
                    </div>

                    <div className="test__selected-topic-box">
                        <div className="test__selected-topics__header">Selected</div>

                        <div className="test__selected-topics">{this.renderTopics("selectedTopics")}</div>
                    </div>
                </div>

                <div className="test__difficulty-box">
                    <div className="test__difficulty-header">Difficulty</div>

                    <div className="test__range-box">
                        <RangeWithTwoSliders
                            id="test__range"
                            getValues={this.getSliderValues.bind(this)}
                            min={0}
                            max={100}
                        />
                    </div>
                </div>

                <div className="test__select-box" >
                    <div>cards selected</div>

                    <RotatingButton
                        id="test__rotating-button"
                        max={this.state.selectedCards.length}
                        getValue={this.getRotatingButtonValue.bind(this)}
                    />
                </div>

                <div className="test__footer">
                    <button onClick={() => this.closeTest()}>Back</button>

                    <button onClick={() => this.startTest()}>Start Test</button>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of Test