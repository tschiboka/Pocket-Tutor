import React, { Component } from "react";

import "./Test.css";

export default class Test extends Component {
    render() {
        return (
            this.props.visible &&
            <div className="test">
                <div className="test__header">Test settings</div>

                <div className="test__topics-box">
                    <div className="test__available-topics-box">
                        <div className="test__available-topics__header">Topics</div>
                    </div>

                    <div className="test__topics-btn-box">
                        <button id="test__select-btn">&gt;</button>

                        <button id="test__deselect-btn">&lt;</button>
                    </div>

                    <div className="test__selected-topic-box">
                        <div className="test__selected-topics__header">Selected</div>
                    </div>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of Test