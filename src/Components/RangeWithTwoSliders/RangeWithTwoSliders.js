import React, { Component } from "react";

import "./RangeWithTwoSliders.css";

export default class RangeWithTwoSliders extends Component {
    constructor(props) {
        super(props);

        const { min, max } = { ...props };
        this.state = { min, max };
    } // end of constructor



    render() {
        return (
            <div className="range" id={this.props.id}>
                <span className="range__min-text">{this.state.min}</span>

                <div className="range__body">

                    <div className="range__body__track">
                        <div className="range__body__thumb"></div>

                        <div className="range__body__slider--min"></div>

                        <div className="range__body__slider--max"></div>
                    </div>
                </div>

                <span className="range__max-text">{this.state.max}</span>
            </div>
        ); // end of return
    } // end of render
} // end of RangeWithTwoSliders