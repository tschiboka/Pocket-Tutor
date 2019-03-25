import React, { Component } from "react";

import "./EditCards.css";

import TopicLabel from "../TopicLabel/TopicLabel";

export default class EditCards extends Component {
    constructor(props) {
        super(props);

        const cards = JSON.parse(localStorage.cards);

        this.state = {
            "id": this.props.id || ++cards[cards.length - 1].id,    // if no id is provided by prop create one (last ind id plus one)
            "card": cards.find(c => c.id === this.props.id) ||      // get card if id is found, so EditCard can be filled up 
                {
                    "id": this.props.id, // id still can be null, later on will be assigned in didRender
                    "question": "",
                    "answer": "",
                    "results": [0, 0],
                    "topics": []
                }, // end of empty card def
            "collapseBtns": [false, false, false], // [labels, question-text, answer-text] collapse buttons (false default)
        } // end of state declaration
    } // end of constructor



    componentDidMount() {
        const newState = this.state;

        newState.card.id = this.state.id; // now card recieves the correct id in case it wasn't declared (id: null in props)

        this.setState(newState);

        this.sizeEditElements();
    } // end of componentDidMount



    sizeEditElements() {
        console.log("SIZE");
    } // end of sizeEditElements



    // collapseInd: 0 - label, 1 - question, 2 - answer
    toggleCollapseBtn(collapseInd) {
        // set collapse btns
        const newState = this.state;

        newState.collapseBtns[collapseInd] = newState.collapseBtns[collapseInd] ? false : true;

        this.setState(newState);

        // get the resizable items
        const
            topics = document.getElementById("edit-cards__topics-settings"),
            question = document.getElementById("edit-cards__question-settings"),
            answer = document.getElementById("edit-cards__answer-settings");

        // set height percentages paragraphs (headers) = 6% * 3 rest divided amoung topics question answer total 82%
        let
            total = 82,
            [topicsPc, questionPc, answerPc] = [0, 0, 0];


        let rest = total - (topicsPc = this.state.collapseBtns[0] ? 0 : 16);

        rest = (!this.state.collapseBtns[1] && !this.state.collapseBtns[2]) ? rest / 2 : rest;

        questionPc = this.state.collapseBtns[1] ? 0 : rest;
        answerPc = this.state.collapseBtns[2] ? 0 : rest;

        topics.style.display = topicsPc ? "flex" : "none";
        question.style.display = questionPc ? "flex" : "none";
        answer.style.display = answerPc ? "flex" : "none";

        topics.style.height = topicsPc + "%";
        question.style.height = questionPc + "%";
        answer.style.height = answerPc + "%";
    } // end of collapseBtn



    renderTopicLabels() {
        let topics = JSON.parse(localStorage.topics)
        topics.unshift({ "name": "no topic" });

        return (
            <div id="edit-cards__topics-settings" className="edit-cards__topic-box">{
                [0, 1, 2].map(ind => (
                    // ADD THREE SELECTORS
                    <div className="edit-cards__topic" key={ind}>
                        <select
                            name={"edit-cards__topic-select" + ind}
                            id={"edit-cards__topic-select" + ind}
                        >
                            {topics.map((topic, tInd) => (
                                // RETURN ALL TOPICS
                                <option
                                    value={topic.name}
                                    key={tInd}
                                >
                                    {topic.name}
                                </option>
                            ))}
                        </select>
                        {console.log()}
                        <TopicLabel text={this.state.card.topics[ind]} color={""} />
                    </div>
                )) // end of outer map
            }</div>
        ); // end of return select
    } // renderTopicLabels



    render() {
        return (
            <div className="edit-cards">
                <div className="edit-cards__inner">
                    <div className="edit-cards__header">
                        <span>Edit Cards</span>

                        <span>id:{this.state.id} results: {this.state.card.results[0]} of {this.state.card.results[1]}</span>
                    </div>

                    <div className="edit-cards__body">
                        <div className="edit-cards__paragraph edit-cards__paragraph--topics">
                            <button
                                className="edit-cards__collapse-btn"
                                onClick={() => this.toggleCollapseBtn(0)}
                            >{this.state.collapseBtns[0] ? <span>&#9660;</span> : <span>&#9650;</span>}</button>

                            Topics settings
                        </div>

                        {this.renderTopicLabels()}

                        <div className="edit-cards__paragraph edit-cards__paragraph--question">
                            <button
                                className="edit-cards__collapse-btn"
                                onClick={() => this.toggleCollapseBtn(1)}
                            >{this.state.collapseBtns[1] ? <span>&#9660;</span> : <span>&#9650;</span>}</button>

                            Edit question
                        </div>

                        <div
                            id="edit-cards__question-settings"
                            className="edit-cards__question-text">
                            <textarea
                                name="edit-cards__question-textarea"
                                className="edit-cards__textarea"
                                placeholder="Question text"
                                id="edit-cards__question-textarea"
                                defaultValue={this.state.card.question && this.state.card.question}
                            >
                            </textarea>
                        </div>

                        <div className="edit-cards__question-box"></div>

                        <div className="edit-cards__paragraph edit-cards__paragraph--answer">
                            <button
                                className="edit-cards__collapse-btn"
                                onClick={() => this.toggleCollapseBtn(2)}
                            >{this.state.collapseBtns[2] ? <span>&#9660;</span> : <span>&#9650;</span>}</button>

                            Edit answer
                        </div>

                        <div
                            id="edit-cards__answer-settings"
                            className="edit-cards__answer-text">
                            <textarea
                                name="edit-cards__answer-textarea"
                                className="edit-cards__textarea"
                                placeholder="Answer text"
                                id="edit-cards__answer-textarea"
                                defaultValue={this.state.card.answer && this.state.card.answer}
                            >
                            </textarea>
                        </div>
                    </div>

                    <div className="edit-cards__footer">
                        <button>Submit</button>

                        <button onClick={() => this.props.openCloseEditCards()}>Back</button>
                    </div>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of EditCards