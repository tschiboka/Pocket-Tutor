import React, { Component } from "react";

import "../RunTest/RunTest.css";

import Card from "../Card/Card";
import RoundProgress from "../RoundProgress/RoundProgress";

export default class RunTest extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "current": 0,              // current card index
            "animationIsOn": false,    // while animation goes disable buttons 
            "cardsTurned": undefined,  // determines if card is faced question up [true, false]
            "results": [],             // collect correct/incorrect answers
            "showResult": false,       // show results div
            "detailedResults": {}      // topics and results  
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
        // set results in localstore
        let
            cards = JSON.parse(localStorage.cards),           // get cards from localStorage
            crdID = this.props.cards[this.state.current].id,  // get the current cards id
            crdIn = cards.findIndex(c => c.id === crdID),     // find its index in local storage cards
            [oldCor, oldTot] = cards[crdIn].results,          // extract results
            newCor = oldCor + (result ? 1 : 0);               // increment correct if result truthy

        cards[crdIn].results = [newCor, ++oldTot];            // modify results here
        localStorage.setItem("cards", JSON.stringify(cards)); // set localstore with updated results

        // disable buttons while animate
        const newState = this.state;
        newState.animationIsOn = true;
        this.setState(newState);

        this.animateProgressBar();

        // give detailed results for charts
        cards[crdIn].topics.forEach(topic => {                // go through cards topics
            if (!newState.detailedResults[topic]) {           // if obj doesnt have key add it
                newState.detailedResults[topic] = [0, 0];     // with 0 (it will be incremented later)
            }                                                 // end of if
            let res = newState.detailedResults[topic];        // store topic result
            newState.detailedResults[topic] =                 // update detailed results topic
                [+res[0] + (result ? 1 : 0), +res[1] + 1];    // increment only if reuslt is truthy
        });                                                   // end of topics foreach

        // general results
        newState.results.push(result);                        // collect results for evaluation without topics
        console.log(newState.detailedResults);

        // delay changes letting the animations time
        const delayForAnimation = setTimeout(() => {
            // change state
            const newState = this.state;
            newState.current++;                                  // here increment current with the delay
            newState.animationIsOn = false;                      // turn of animation

            if (this.state.current >= this.props.cards.length) { // show results if last card has gone
                newState.showResult = true;                      // set state to show result
            }                                                    // end of if last card has gone
            this.setState(newState);                             // change state HERE

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



    renderResults() {
        const
            resu = this.state.detailedResults,
            perc = {};
        Object.keys(resu).forEach(t =>
            perc[t] = Math.round(resu[t][0] ? (resu[t][0] / resu[t][1]) * 100 : 0));

        if (this.props.cards.length === 1 || Object.keys(this.state.detailedResults).length === 1) {
            return <div className="run-test__results">
                <RoundProgress
                    id="run-test--JS-percent1"
                    percent={perc[Object.keys(perc)[0]]}
                    name="Total"
                    color="#ddd" />
            </div>
        }
        else {
            const total = (this.state.results.map(r => r ? 1 : 0).reduce((p, c) => p + c) / this.state.results.length) * 100;
            return <div className="run-test__results">
                <RoundProgress
                    id="run-test--JS-percent1"
                    percent={total}
                    name="Total"
                    color="#ddd" />
                {Object.keys(perc).map((t, i) => {
                    const
                        percentage = perc[t],
                        color = JSON.parse(localStorage.topics).find(to => to.name === t).color;

                    return <RoundProgress
                        id={"run-test--JS-percent" + i + 1}
                        percent={percentage}
                        name={t}
                        color={color}
                    />
                })}
            </div>
        }
    } // end of renderResults



    closeTest() {
        // set back the original state
        this.setState({
            "current": 0,              // current card index
            "animationIsOn": false,    // while animation goes disable buttons 
            "cardsTurned": undefined,  // determines if card is faced question up [true, false]
            "results": [],             // collect correct/incorrect answers
            "showResult": false,       // show results div
            "detailedResults": {}      // topics and results  
        });
        this.props.changeView("browse");
    } // end of closeTest



    render() {
        return (
            !this.state.showResult ?
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
                : <div className="run-test__results-box">
                    <div className="run-test__results-body">{this.renderResults()}</div>

                    <div className="run-test__results-footer">
                        <button onClick={() => this.closeTest()}>OK</button>
                    </div>
                </div>
        ); // end of return
    } // end of render
} // end of RunTest