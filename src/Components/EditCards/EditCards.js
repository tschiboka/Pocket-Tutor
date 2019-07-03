import React, { Component } from "react";

import "./EditCards.css";

import TopicLabel from "../TopicLabel/TopicLabel";

export default class EditCards extends Component {
    constructor(props) {
        super(props);

        const cards = JSON.parse(localStorage.cards);

        this.state = {
            "id": this.props.id || (cards.length ? ++cards[cards.length - 1].id : 1),    // if no id is provided by prop create one (last ind id plus one)
            "card": cards.find(c => c.id === this.props.id) ||      // get card if id is found, so EditCard can be filled up 
                {
                    "id": this.props.id, // id still can be null, later on will be assigned in didRender
                    "question": "",
                    "answer": "",
                    "results": [0, 0],
                    "topics": [],
                }, // end of empty card def
            "collapseBtns": [false, false, false], // [labels, question-text, answer-text] collapse buttons (false default)
            "enabledTopics": [], // all the topic options that are currently selected will be disabled (card can not have a certain topic multiple times)
            "languageMenuOpen": [false, false], // [questionMenuOpen, answerMenuOpen]
        } // end of state declaration
    } // end of constructor



    componentDidMount() {
        const newState = this.state;

        newState.card.id = this.state.id; // now card recieves the correct id in case it wasn't declared (id: null in props)

        // taylor topics, so it can be modified by editCard safely
        newState.card.topics = Array(3).fill("").map((t, i) => newState.card.topics[i] ? newState.card.topics[i] : "no topic");

        // set enabledTopics
        newState.enabledTopics = this.disableTopicOptions(...newState.card.topics);

        this.setState(newState);
    } // end of componentDidMount



    disableTopicOptions(...topicsToDisable) {
        // set enabledTopics
        let enabledTopics = JSON.parse(localStorage.topics).map(t => t.name);
        enabledTopics.unshift("no topic");

        // weed out the ones to be desabled
        topicsToDisable.map(td => {
            if (td !== "no topic") {
                enabledTopics = enabledTopics.filter(en => en !== td);
            } // end of if not no topic
        }); // end of map arguments

        return enabledTopics;
    } // end of disableTopicOptions



    // collapseInd: 0 - label, 1 - question, 2 - answer
    toggleCollapseBtn(collapseInd) {
        // set collapse btns
        const newState = this.state;

        // collapse languageMenus
        newState.languageMenuOpen = [false, false];

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


        let rest = total - (topicsPc = this.state.collapseBtns[0] ? 0 : 16); // topics is fixed 16%

        rest = (!this.state.collapseBtns[1] && !this.state.collapseBtns[2]) ? rest / 2 : rest; // rest divvy up space

        questionPc = this.state.collapseBtns[1] ? 0 : rest;
        answerPc = this.state.collapseBtns[2] ? 0 : rest;

        // display changes
        topics.style.display = topicsPc ? "flex" : "none";
        question.style.display = questionPc ? "flex" : "none";
        answer.style.display = answerPc ? "flex" : "none";

        topics.style.height = topicsPc + "%";
        question.style.height = questionPc + "%";
        answer.style.height = answerPc + "%";
    } // end of collapseBtn



    setTopicOption(ind) {
        const newState = this.state;

        const value = document.getElementById("edit-cards__select" + ind).value;

        newState.card.topics[ind] = value;

        newState.enabledTopics = this.disableTopicOptions(...newState.card.topics);

        this.setState(newState);
    } // end of setTopiucOption



    renderTopicLabels() {
        let topics = JSON.parse(localStorage.topics);
        topics.unshift({ "name": "no topic" });

        return (
            <div id="edit-cards__topics-settings" className="edit-cards__topic-box">{
                [0, 1, 2].map(ind => (
                    // ADD THREE SELECTORS
                    <div className="edit-cards__topic" key={ind}>
                        <div className="custom-dropdown">
                            <select
                                defaultValue={this.state.card.topics[ind] || "no topic"}
                                id={"edit-cards__select" + ind}
                                onChange={() => this.setTopicOption(ind)}
                            >
                                {topics.map((topic, tInd) => (
                                    // RENDER OPTIONS
                                    <option
                                        value={topic.name}
                                        disabled={!this.state.enabledTopics.some(et => et === topic.name)}
                                        key={tInd}
                                    >
                                        {topic.name}
                                    </option>
                                ))}
                            </select>

                        </div>
                        {this.state.card.topics[ind] !== "no topic" && <TopicLabel
                            text={this.state.card.topics[ind]}
                            color={(topics.find(t => t.name === this.state.card.topics[ind]) || { "color": "" }).color}
                        />}
                    </div>
                )) // end of outer map
            }</div>
        ); // end of return select
    } // renderTopicLabels



    toggleLanguageMenu(index) {
        // change state according to index
        const newState = this.state;
        newState.languageMenuOpen[index] = !newState.languageMenuOpen[index];
        this.setState(newState);
    } // end of toggleLanguageMenu



    addCodeTag(lang, where) {
        const                                             // get elements and values for positioning lang tag
            txtId = "edit-cards__" + where + "-textarea", // get the element id               
            tArea = document.getElementById(txtId),       // get the textarea element
            stPos = tArea.selectionStart,                 // selection start position
            enPos = tArea.selectionEnd;                   // selection end position

        if (stPos === enPos) {                            // if there is no selection in text area
            tArea.value =                                 // add new value to textarea
                tArea.value.slice(0, stPos) +             // get text before cursor position
                "<###lang=" + lang + "><###>" +           // add tag
                tArea.value.slice(stPos);                 // get text after cursor position
        }                                                 // end of if there is no selection
        else {                                            // if there is text selected
            tArea.value =                                 // add new value to textarea
                tArea.value.slice(0, stPos) +             // get text before cursor position
                "<###lang=" + lang + ">" +                // add start language tag
                tArea.value.slice(stPos, enPos) +         // add selected area
                "<###>" +                                 // add end tag
                tArea.value.slice(enPos);                 // add rest of text
        }                                                 // end of if there is a selection
    } // end of addCodeTag



    clearLanguageMenu(index) {
        const newState = this.state;
        newState.languageMenuOpen[index] = false;
        this.setState(newState);
    } // end of clearLanguageMenu



    handleTextAreaOnBlur(event, cardProp) {
        const newState = this.state;

        newState.card[cardProp] = event.target.value.replace(/"/g, "\"");

        this.setState(newState);
    } // end of handleTextAreaOnBlur



    submitCard() {
        const cardToSubmit = this.state.card;

        cardToSubmit.topics = cardToSubmit.topics.filter(t => t !== "no topic");

        const cards = JSON.parse(localStorage.cards);

        // if card existed, modify it
        const cardIndToModify = cards.findIndex(c => c.id === cardToSubmit.id);

        if (cardIndToModify >= 0) {
            cards.splice(cardIndToModify, 1, cardToSubmit);
        } // end of if card id existed
        else {
            cards.push(cardToSubmit);
        } // end of if card id didn't exist

        // MODIFY LOCALSTORAGE
        localStorage.setItem("cards", JSON.stringify(cards));

        // close editcards
        this.props.openCloseEditCards();
    } // end of submitCard



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
                            {
                                this.state.card.topics.filter(t => t !== "no topic").length ?
                                    <span className="edit-cards__valid-field-txt">&#10003;</span> :
                                    <span className="edit-cards__invalid-field-txt">required field</span>
                            }
                        </div>

                        {this.renderTopicLabels(this.state)}

                        <div className="edit-cards__paragraph edit-cards__paragraph--question">
                            <button
                                className="edit-cards__collapse-btn"
                                onClick={() => this.toggleCollapseBtn(1)}
                            >{this.state.collapseBtns[1] ? <span>&#9660;</span> : <span>&#9650;</span>}</button>

                            <button
                                id="edit-cards__language-btn--question"
                                onClick={() => this.toggleLanguageMenu(0)}
                                className="edit-cards__language-btn"><span>&lt;<span>&bull;</span><span>&bull;</span><span>&bull;</span>/&gt;</span></button>

                            Edit question

                            {
                                /\w/g.test(this.state.card.question) ?
                                    <span className="edit-cards__valid-field-txt">&#10003;</span> :
                                    <span className="edit-cards__invalid-field-txt">required field</span>
                            }
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
                                onBlur={e => this.handleTextAreaOnBlur(e, "question")}
                            >
                            </textarea>
                        </div>

                        <div className="edit-cards__question-box"></div>

                        <div className="edit-cards__paragraph edit-cards__paragraph--answer">
                            <button
                                className="edit-cards__collapse-btn"
                                onClick={() => this.toggleCollapseBtn(2)}
                            >{this.state.collapseBtns[2] ? <span>&#9660;</span> : <span>&#9650;</span>}</button>

                            <button
                                id="edit-cards__language-btn--answer"
                                onClick={() => this.toggleLanguageMenu(1)}
                                className="edit-cards__language-btn"><span>&lt;<span>&bull;</span><span>&bull;</span><span>&bull;</span>/&gt;</span></button>

                            Edit answer

                            {
                                /\w/g.test(this.state.card.answer) ?
                                    <span className="edit-cards__valid-field-txt">&#10003;</span> :
                                    <span className="edit-cards__invalid-field-txt">required field</span>
                            }
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
                                onBlur={e => this.handleTextAreaOnBlur(e, "answer")}
                                onFocus={() => this.clearLanguageMenu(1)}
                            >
                            </textarea>

                            {this.state.languageMenuOpen[1] &&
                                <div
                                    id="edit-cards__language-menu--answer"
                                    className="edit-cards__language-menu">
                                    <button onClick={() => this.addCodeTag("HTML", "answer")}>HTML</button>

                                    <button onClick={() => this.addCodeTag("CSS", "answer")}>CSS</button>

                                    <button onClick={() => this.addCodeTag("JS", "answer")}>JS</button>
                                </div>}
                        </div>
                    </div>

                    <div className="edit-cards__footer">
                        <button
                            id="edit-cards__submit-btn"
                            onClick={() => this.submitCard()}
                            disabled={!(/\w/g.test(this.state.card.question) && /\w/g.test(this.state.card.answer) && this.state.card.topics.filter(t => t !== "no topic").length)}
                        >Submit</button>

                        <button onClick={() => this.props.openCloseEditCards()}>Back</button>
                    </div>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of EditCards