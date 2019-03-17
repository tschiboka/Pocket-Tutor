import React, { Component } from "react";

import "./CardThumbnail.css";
import TopicLabel from "../TopicLabel/TopicLabel";

export default class CardThumbnail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "buttonsVisible": false
        }; // end of state declaration 
    } // end of constructor


    showButtons(show) {
        const newState = this.state;

        newState.buttonsVisible = show;

        this.setState(newState);
        console.log("show buttons ", show);
    } // end of showButtons



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
                        card.topics.map(topic => {
                            const color = (JSON.parse(localStorage.topics).filter(t => t.name === topic) || ["rgba(255, 255, 255, 0.1)"])[0].color;

                            return <TopicLabel text={topic} color={color} />
                        })
                    }
                    <span>{Math.round((card.results[0] / card.results[1]) * 100)}% id:{card.id}</span>
                </div>

                <div className="card-thumbnail__body">{card.question}</div>

                <div className="card-thumbnail__button-box">
                    {
                        this.state.buttonsVisible
                        && <button
                            className="card-thumbnail__edit"
                            onClick={e => { console.log("EDIT"); }}
                        > 	&#9998; </button>
                    }
                    {
                        this.state.buttonsVisible &&
                        <button
                            className="card-thumbnail__turn"
                            onClick={() => { console.log("TURN") }}
                        > &#8630; </button>
                    }
                    {
                        this.state.buttonsVisible &&
                        <button
                            className="card-thumbnail__remove"
                            onClick={() => { console.log("REMOVE") }}
                        > &#9986; </button>
                    }
                </div>
            </div>
        );
    } // end of render
} // end of CardThumbnail