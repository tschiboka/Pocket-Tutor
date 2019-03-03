import React, { Component } from "react";

import "./AddTopic.css";

export default class AddTopic extends Component {
    render() {
        return (
            <div className="add-topic">
                <div className="add-topic__header">
                    Add topic

                    <button id="cancel-add-topic-btn">&times;</button>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of AddTopic