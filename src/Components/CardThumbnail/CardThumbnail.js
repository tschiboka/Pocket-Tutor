import React, { Component } from "react";

import "./CardThumbnail.css";
import TopicLabel from "../TopicLabel/TopicLabel";

export default class CardThumbnail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "questionSide": true,
            "buttonsVisible": false
        }; // end of state declaration 
    } // end of constructor


    showButtons(show) {
        const newState = this.state;

        newState.buttonsVisible = show;

        this.setState(newState);
    } // end of showButtons



    turnCard() {
        const newState = this.state;

        newState.questionSide = newState.questionSide ? false : true; // toggle sides

        this.setState(newState);
    } // end of turnCard



    render() {
        const card = JSON.parse(localStorage.cards).filter(c => c.id === this.props.id)[0];

        return (
            <div
                className="card-thumbnail"
                onMouseOver={() => this.showButtons(true)}
                onMouseLeave={() => this.showButtons(false)} // onmouseout would make buttons disappear
                onClick={() => this.showButtons(this.state.buttonsVisible ? false : true)}
            >
                <div className="card-thumbnail__header">
                    {
                        card.topics.map((topic, i) => {
                            const color = (JSON.parse(localStorage.topics).filter(t => t.name === topic) || ["rgba(255, 255, 255, 0.1)"])[0].color;

                            return <TopicLabel text={topic} color={color} key={i} />
                        })
                    }
                    <span>{card.results[1] ? Math.round((card.results[0] / card.results[1]) * 100) : 0}% id:{card.id}</span>
                </div>

                <div className="card-thumbnail__body">{this.state.questionSide ? card.question : card.answer}</div>

                <div className="card-thumbnail__button-box">
                    {
                        this.state.buttonsVisible &&
                        <button
                            className="card-thumbnail__edit"
                            onClick={() => this.props.edit(true, this.props.id)}
                        > 	&#9998; </button>
                    }
                    {
                        this.state.buttonsVisible &&
                        <button
                            className="card-thumbnail__turn"
                            onClick={() => { this.turnCard() }}
                        > &#8630; </button>
                    }
                    {
                        this.state.buttonsVisible &&
                        <button
                            className="card-thumbnail__remove"
                            onClick={() => { this.props.remove(this.props.id) }}
                        > &#9986; </button>
                    }
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of CardThumbnail