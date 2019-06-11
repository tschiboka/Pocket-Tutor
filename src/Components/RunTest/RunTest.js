import React, { Component } from "react";

import "../RunTest/RunTest.css";

export default class RunTest extends Component {
    render() {
        return (
            this.props.visible &&
            <div className="run-test-box">
                <div className="run-test__progress-box">
                    <div className="run-test__progressbar">
                        <div className="run-test__progress"></div>
                    </div>
                </div>

                <div className="run-test__test-box">
                    <div className="run-test__cards">

                    </div>

                    <div className="run-test__btn-box">
                        <button>&times;</button>

                        <button>Turn</button>

                        <button>&#10003;</button>
                    </div>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of RunTest