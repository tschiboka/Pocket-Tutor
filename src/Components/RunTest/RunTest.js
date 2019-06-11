import React, { Component } from "react";

import "../RunTest/RunTest.css";

export default class RunTest extends Component {
    render() {
        return (
            this.props.visible &&
            <div>Runtest</div>
        ); // end of return
    } // end of render
} // end of RunTest