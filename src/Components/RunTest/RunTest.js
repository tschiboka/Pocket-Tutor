import React, { Component } from "react";

import "../RunTest/RunTest.css";

import Card from "../Card/Card";

export default class RunTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "current": 0,
            "animationIsOn": false
        } // end of state declaration
    } // end of constructor



    // true/false store result
    assesCard(result) {
        // disable buttons while animate
        const newState = this.state;
        newState.animationIsOn = true;
        this.setState(newState);

        // delay changes letting the animations time
        const delayForAnimation = setTimeout(() => {
            // here are the changes on the localstore card object

            // change state
            const newState = this.state;
            newState.current++;
            newState.animationIsOn = false;
            this.setState(newState);

            if (this.state.current >= this.props.cards.length) console.log("SHOW RESULT");

            console.log("RESULT", result);


            // roll the cards and animate
            this.rollCard();

            clearTimeout(delayForAnimation);
        }, 1000);
    } // end of assesCard



    rollCard() {
        console.log("ROLL HERE");

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
                        <button
                            id="run-test__correct-btn"
                            disabled={this.state.animationIsOn}
                            onClick={() => this.assesCard(false)}>&times;</button>

                        <button
                            id="run-test__turn-btn"
                            disabled={this.state.animationIsOn}
                        >Turn</button>

                        <button
                            id="run-test__false-btn"
                            disabled={this.state.animationIsOn}
                            onClick={() => this.assesCard(true)}>&#10003;</button>
                    </div>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of RunTest