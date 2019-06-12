import React, { Component } from "react";

import "../RunTest/RunTest.css";

import Card from "../Card/Card";

export default class RunTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "current": 0
        } // end of state declaration
    } // end of constructor



    // true/false store result
    assesCard(result) {
        // change state
        const newState = this.state;
        newState.current++;
        this.setState(newState);

        console.log("RESULT", result);

        // here are the changes on the localstore card objetc

        // roll the cards and animate
        this.rollCard();
    } // end of assesCard



    rollCard() {

    } // end of rollCard



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
                        <div id="run-test__prev-card-div">
                            <Card card={this.props.cards[this.state.current - 1]} />
                        </div>

                        <div id="run-test__curr-card-div">
                            <Card card={this.props.cards[this.state.current]} />
                        </div>

                        <div id="run-test__next-card-div">
                            <Card card={this.props.cards[this.state.current + 1]} />
                        </div>

                        <div id="run-test__nex2-card-div">
                            <Card card={this.props.cards[this.state.current + 2]} />
                        </div>
                    </div>

                    <div className="run-test__btn-box">
                        <button onClick={() => this.assesCard(false)}>&times;</button>

                        <button>Turn</button>

                        <button onClick={() => this.assesCard(true)}>&#10003;</button>
                    </div>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of RunTest