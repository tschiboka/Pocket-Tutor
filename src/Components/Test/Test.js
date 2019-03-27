import React, { Component } from "react";

import "./Test.css";

export default class Test extends Component {
    render() {
        return (
            this.props.visible &&
            <div className="test">
                <div className="test__header">Test settings</div>
            </div>
        );
    } // end of render
} // end of Test