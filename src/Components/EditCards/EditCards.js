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
                    "topic": []
                }, // end of empty card def
            "collapseBtns": [false, false, false] // [labels, question-text, answer-text] collapse buttons (false default)
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
        console.log(collapseInd);

        // set collapse btns
        const newState = this.state;

        newState.collapseBtns[collapseInd] = newState.collapseBtns[collapseInd] ? false : true;

        this.setState(newState);
    } // end of collapseBtn



    renderTopicLabels() {
        return this.state.card.topics.map((topic, i) =>
            <TopicLabel text={topic} color={JSON.parse(localStorage.topics).find(t => t.name === topic).color} key={i} />
        ); // end of return map
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

                        <div className="edit-cards__topics-box">
                            {this.renderTopicLabels()}
                        </div>

                        <div className="edit-cards__paragraph edit-cards__paragraph--question">
                            <button
                                className="edit-cards__collapse-btn"
                                onClick={() => this.toggleCollapseBtn(1)}
                            >{this.state.collapseBtns[1] ? <span>&#9660;</span> : <span>&#9650;</span>}</button>

                            Edit question
                        </div>

                        <div className="edit-cards__question-text">
                            <textarea
                                name="edit-cards__question-textarea"
                                className="edit-cards__textarea"
                                id="edit-cards__question-textarea">
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

                        <div className="edit-cards__answer-text">
                            <textarea
                                name="edit-cards__answer-textarea"
                                className="edit-cards__textarea"
                                id="edit-cards__answer-textarea">
                            </textarea>
                        </div>
                    </div>

                    <div className="edit-cards__footer">
                        <button>Submit</button>

                        <button>Back</button>
                    </div>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of EditCards