import React, { Component } from "react";

import "../RotatingButton/RotatingButton.css";

export default class RotatingButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "current": this.props.max,
            "prevMax": this.props.max,
            "currMax": this.props.max,
            "mouseDown": false
        } // end of state declaration
    } // end of constructor



    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            const maxChanged = this.state.prevMax !== this.props.max;

            if (maxChanged) {
                const newState = this.state;

                newState.current = this.props.max;
                newState.prevMax = this.state.currMax;
                newState.currMax = this.props.max;

                this.setState(newState);
            } // end of if max changed
        } // avoid re-render (state change triggers didUpdate again)
    } // end of componentWillUpdate



    changeCurrNum(num) {
        const oldCurr = this.state.current;

        if (oldCurr + num <= this.props.max && oldCurr + num > 0) this.setState({ "current": oldCurr + num });
    } // end of changeCurrNum



    handleMouseDown(num) {
        // MouseDown reacts with delay
        const reactionTime = setTimeout(() => {
            const delay = 200;


            const newState = this.state;

            newState.mouseDown = true;

            this.setState(newState);
        }, 1500); // end of reactionTime
    } // end of handleMousweDown



    handleMouseUp() {
        const newState = this.state;

        newState.mouseDown = false;

        this.setState(newState);
    } // end of handleMouseUp



    renderNumbers(max, currNum) {
        let [prev, curr, next] = [currNum - 1, currNum, currNum + 1];

        // weed out values like 0 or anything over max
        if (prev < 1) prev = "";
        if (next > max) next = "";


        return (
            <div className="rot-btn__nums">
                <div id="rot-btn__num-prev" className="rot-btn__num">{prev}</div>

                <div id="rot-btn__num-curr" className="rot-btn__num">{curr}</div>

                <div id="rot-btn__num-next" className="rot-btn__num">{next}</div>
            </div>
        );
    } // end of renderNumbers



    render() {
        return (
            <div className="rot-btn">
                <div className="rot-btn__btn-box">
                    <button
                        className={this.state.current > 1 ? "rot-btn__arrow--active" : ""}
                        onMouseDown={() => this.handleMouseDown(-1)}
                        onMouseUp={() => this.handleMouseUp()}
                        onMouseOut={() => this.handleMouseUp()}
                        onClick={() => this.changeCurrNum(-1)}>&#9650;</button>

                    <button
                        className={this.state.current < this.state.currMax ? "rot-btn__arrow--active" : ""}
                        onMouseDown={() => this.handleMouseDown(1)}
                        onMouseUp={() => this.handleMouseUp()}
                        onMouseOut={() => this.handleMouseUp()}
                        onClick={() => this.changeCurrNum(1)}>&#9660;</button>
                </div>
                <div className="rot-btn__num-box">
                    {this.renderNumbers(this.props.max, this.state.current)}
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of RotatingButton class