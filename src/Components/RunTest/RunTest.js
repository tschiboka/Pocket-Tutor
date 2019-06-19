import React, { Component } from "react";

import "../RunTest/RunTest.css";

import Card from "../Card/Card";

export default class RunTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "current": 0,              // current card index
            "animationIsOn": false,    // while animation goes disable buttons 
            "cardsTurned": undefined,  // determines if card is faced question up [true, false]
            "results": []              // collect correct/incorrect answers
        } // end of state declaration
    } // end of constructor



    turnCard() {
        // create an array of false the first time the function runs
        const turned = this.state.cardsTurned || Array(this.props.cards.length).fill(false);

        // set current card in the array
        turned[this.state.current] = turned[this.state.current] ? false : true;


        // set state
        const newState = this.state;
        newState.cardsTurned = turned;
        this.setState(newState);
    } // end of turnCard



    // accept true/false store result
    assesCard(result) {
        // disable buttons while animate
        const newState = this.state;
        newState.animationIsOn = true;
        this.setState(newState);

        this.animateProgressBar();

        // delay changes letting the animations time
        const delayForAnimation = setTimeout(() => {
            // change state
            const newState = this.state;
            newState.current++;             // here increment current with the delay
            newState.animationIsOn = false; // turn of animation
            this.setState(newState);

            // show results if last card has gone
            if (this.state.current >= this.props.cards.length) console.log("SHOW RESULT");

            clearTimeout(delayForAnimation);
        }, 1500); // end of delayForAnimation
    } // end of assesCard



    // give classes to card divs on the fly while considering animation
    addCardClasses(ind) {
        const
            name = ["prev", "curr", "next", "nex2"],                  // the placeholder names
            curr = this.state.current,                                // current
            clNa = name.map((n, i) => ind === curr + i - 1 ? n : ""), // get the name for the index 
            clss = "run-test__" + clNa.join("") + "-card-div";        // create className  

        return clss + (this.state.animationIsOn ? " " + clss + "--animation" : "");
    } // end of addCardClasses



    // dinamically animate the progress bar
    animateProgressBar() {
        const
            cardLen = this.props.cards.length,                       // get cardsLength
            current = this.state.current,                            // get current
            calcPer = (lg, sm) => lg && sm ? (sm / lg) * 100 : 0,    // create func that return precentage
            currPer = calcPer(cardLen, current),                     // current percentage
            nextPer = calcPer(cardLen, current + 1),                 // percentage of the next step
            progres = document.getElementById("run-test__progress"), // the progress bar element
            oneStep = (nextPer - currPer) / 10;                      // the amount progress bar goes in one step (10 step anim)

        let counter = 0,
            currWidth = currPer;

        // create a timer for progressbar width grow
        const progressTimer = setInterval(() => {
            currWidth += oneStep;                              // increase width by 1 unit

            progres.style.width = currWidth + "%";             // set width

            if (++counter === 9) clearInterval(progressTimer); // increment and clear    
        }, 150); // end of progressTimer
    } // end of animateProggressBar



    render() {
        return (
            this.props.visible &&
            <div className="run-test-box">
                <div className="run-test__progress-box">
                    <div className="run-test__progressbar">
                        <div id="run-test__progress"></div>
                    </div>
                </div>

                <div className="run-test__test-box">
                    <div className="run-test__cards">
                        {this.props.cards.map((card, i) => (
                            <div
                                key={i}
                                className={this.addCardClasses(i)}>
                                <Card
                                    card={card}
                                    turned={!this.state.cardsTurned ? false : this.state.cardsTurned[this.state.current]}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="run-test__btn-box">
                        <button
                            id="run-test__incorrect-btn"
                            disabled={this.state.animationIsOn}
                            onClick={() => this.assesCard(false)}>&times;</button>

                        <button
                            id="run-test__turn-btn"
                            disabled={this.state.animationIsOn}
                            onClick={() => this.turnCard()}
                        >Turn</button>

                        <button
                            id="run-test__correct-btn"
                            disabled={this.state.animationIsOn}
                            onClick={() => this.assesCard(true)}>&#10003;</button>
                    </div>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of RunTest