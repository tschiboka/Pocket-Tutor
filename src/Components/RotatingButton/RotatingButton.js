import React, { Component } from "react";

import "../RotatingButton/RotatingButton.css";

export default class RotatingButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "current": this.props.max,
            "prevMax": this.props.max,
            "currMax": this.props.max
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



    renderNumbers(max, currNum) {
        let [prev, curr, next] = [currNum - 1, currNum, currNum + 1];

        // weed out values like 0 or anything over max
        if (prev < 0) prev = "";
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
                        className="rot-btn__arrow--active"
                        onClick={() => this.changeCurrNum(-1)}>&#9650;</button>

                    <button
                        className="rot-btn__arrow--active"
                        onClick={() => this.changeCurrNum(1)}>&#9660;</button>
                </div>
                <div className="rot-btn__num-box">
                    {this.renderNumbers(this.props.max, this.state.current)}
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of RotatingButton class