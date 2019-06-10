import React, { Component } from "react";

import "../RotatingButton/RotatingButton.css";

export default class RotatingButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "current": this.props.max,
            "prevMax": this.props.max,
            "currMax": this.props.max,
            "mouseOn": false
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
        else {
            this.props.getValue(this.state.current);
            console.log(this.state.current);
        }
    } // end of componentWillUpdate



    changeCurrNum(num) {
        const oldCurr = this.state.current;

        if (oldCurr + num <= this.props.max && oldCurr + num > 0) this.setState({ "current": oldCurr + num });
    } // end of changeCurrNum



    handleMouseDown(num) {
        // set onmouse
        const newState = this.state;
        newState.mouseOn = true;
        this.setState(newState);

        const createTimer = (duration) => setTimeout(() => {
            if (this.state.mouseOn) {
                duration -= 60; // decrease duration

                if (duration <= 60) duration = 60; // set minimum duration

                this.changeCurrNum(num);
                createTimer(duration); // recurse
            } else clearTimeout(createTimer);
        }, duration);

        clearTimeout(createTimer);
        createTimer(300);
    } // end of handleMousweDown



    handleMouseUp() {
        // stop onmouse
        console.log("STOP"); const newState = this.state;
        newState.mouseOn = false;
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

                <div className="rot-btn__num-box">{this.renderNumbers(this.props.max, this.state.current)}</div>
            </div>
        ); // end of return
    } // end of render
} // end of RotatingButton class