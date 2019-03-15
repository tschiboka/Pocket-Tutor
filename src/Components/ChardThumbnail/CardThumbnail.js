import React, { Component } from "react";

import "./CardThumbnail.css";
import TopicLabel from "../TopicLabel/TopicLabel";

export default class CardThumbnail extends Component {
    render() {
        const card = JSON.parse(localStorage.cards).filter(c => c.id === this.props.id)[0];

        console.log(card);
        return (
            <div className="card-thumbnail">
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
            </div>
        );
    } // end of render
} // end of CardThumbnail