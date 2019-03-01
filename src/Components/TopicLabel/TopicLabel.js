import React, { Component } from "react";

import "./TopicLabel.css";

export default class TopicLabel extends Component {
    render() {
        return (
            <div className="topic-label">
                <div className="topic-label__circle"></div>
                <span className="topic-label__text">{this.props.text} </span>
            </div>
        )
    }
}