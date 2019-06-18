import React, { Component } from "react";

import "../RunTest/RunTest.css";

import Card from "../Card/Card";

export default class RunTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "current": 0,
            "animationIsOn": false,
            "cardsTurned": undefined
        } // end of state declaration
    } // end of constructor



    turnCard() {
        const turned = this.state.cardsTurned || Array(this.props.cards.length).fill(false);

        turned[this.state.current] = turned[this.state.current] ? false : true;

        // set state
        const newState = this.state;
        newState.cardsTurned = turned;
        this.setState(newState);
    } // end of turnCard



    // true/false store result
    assesCard(result) {
        // disable buttons while animate
        const newState = this.state;
        newState.animationIsOn = true;
        this.setState(newState);


        // roll the cards and animate
        this.rollCard();

        // delay changes letting the animations time
        const delayForAnimation = setTimeout(() => {
            // here are the changes on the localstore card object

            // change state
            const newState = this.state;
            newState.current++;
            newState.animationIsOn = false;
            this.setState(newState);

            if (this.state.current >= this.props.cards.length) console.log("SHOW RESULT");

            clearTimeout(delayForAnimation);
        }, 1000);
    } // end of assesCard



    rollCard() {
        /* in order to restart animation every time we roll cards
           they need to be destroyed and re-added */
        console.log("ROLL HERE");

        const // card-divs
            prev = document.getElementById("run-test__prev-card-div"), // previous card div
            curr = document.getElementById("run-test__curr-card-div"), // current card div
            next = document.getElementById("run-test__next-card-div"), // next card div
            nex2 = document.getElementById("run-test__nex2-card-div"), // the second next card div
            divs = [prev, curr, next, nex2],                           // all divs in an array
            clon = divs.map(div => div.cloneNode(true)),               // all clones of above divs
            name = ["prev", "curr", "next", "nex2"];                   // the name strings that classes will have 

        // replace all elements with clone (clone has diff ref, so it will trigger animations)
        divs.forEach((div, i) => div.parentNode.replaceChild(clon[i], div));

        // add animation classes to the newly created clone divs
        name.forEach((na, i) => clon[i].classList.add("run-test__animate--" + na + "-card"));
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
                            <Card
                                card={this.props.cards[this.state.current - 1]}
                                turned={!this.state.cardsTurned ? false : this.state.cardsTurned[this.state.current - 1]}
                            />
                        </div>

                        <div id="run-test__curr-card-div">
                            <Card
                                card={this.props.cards[this.state.current]}
                                turned={!this.state.cardsTurned ? false : this.state.cardsTurned[this.state.current]}
                            />
                        </div>

                        <div id="run-test__next-card-div">
                            <Card
                                card={this.props.cards[this.state.current + 1]}
                                turned={!this.state.cardsTurned ? false : this.state.cardsTurned[this.state.current + 1]}
                            />
                        </div>

                        <div id="run-test__nex2-card-div">
                            <Card
                                card={this.props.cards[this.state.current + 2]}
                                turned={!this.state.cardsTurned ? false : this.state.cardsTurned[this.state.current + 2]}
                            />
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
                            onClick={() => this.turnCard()}
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