import React, { Component } from "react";

import "./Topics.css"

export default class Topics extends Component {
    render() {
        return (
            <div
                className="topics"
                style={{ display: this.props.visible ? "block" : "none" }}
            >
                <div className="topics-box">
                    <div className="topics-box__topic-list"></div>
                    <div className="topics-box__buttons">
                        <button>Add</button>

                        <button>Remove</button>
                    </div>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of topics