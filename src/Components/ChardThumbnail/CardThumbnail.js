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
    } // end of showButtons



    render() {
        const card = JSON.parse(localStorage.cards).filter(c => c.id === this.props.id)[0];

        console.log(card);
        return (
            <div
                className="card-thumbnail"
                onMouseOver={() => this.showButtons(true)}
                onMouseOut={() => this.showButtons(false)}
                onClick={() => this.showButtons(this.state.buttonsVisible ? false : true)}
            >
                {this.state.buttonsVisible && <button className="card-thumbnail__edit">edit</button>}

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


                {this.state.buttonsVisible && <button className="card-thumbnail__remove">remove</button>}
            </div>
        );
    } // end of render
} // end of CardThumbnail