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
                    {card.topics
                        .map(topic => {
                            const
                                color = JSON.parse(localStorage.topics)
                                    .filter(t => t.name === topic)[0].color;

                            console.log(topic);

                            return <TopicLabel text={topic} color={color} />
                        })
                    }
                </div>
                CARD
            </div>
        );
    } // end of render
} // end of CardThumbnail