import React, { Component } from "react";

import "./RangeWithTwoSliders.css";

export default class RangeWithTwoSliders extends Component {
    constructor(props) {
        super(props);

        const { min, max } = { ...props };
        this.state = {
            min, max,
            "mouseDown": false,
        };
    } // end of constructor



    handleMouseDown(target, e) {
        const newState = this.state;

        newState.mouseDown = target;

        if (target === "min") { newState.minStartX = e.clientX; }

        if (target === "max") { newState.maxStartX = e.clientX; }
        this.setState(newState);
    } // end of handleMouseDown


    resetMouseDown() {
        const newState = this.state;

        // reset
        newState.mouseDown = false;

        this.setState(newState);
    } // resetMouseDown



    handleMouseMove(e) {
        e.preventDefault();

        // SET THUMBS
        if (this.state.mouseDown === "min") {
            const // get slide and mouse values
                slider = document.getElementById(this.props.id + "__slider--min"),
                mouseX = e.clientX,
                track = document.getElementById(this.props.id + "__track"),
                trackX = Math.round(track.getBoundingClientRect().x),
                diffX = mouseX - trackX;

            slider.style.left = diffX + "px";
        } // end of if min is being slided

        if (this.state.mouseDown === "max") {
            const // get slide and mouse values
                slider = document.getElementById(this.props.id + "__slider--max"),
                sliderRect = slider.getBoundingClientRect(),
                sliderEnd = sliderRect.right,
                mouseX = e.clientX,
                track = document.getElementById(this.props.id + "__track"),
                trackRect = track.getBoundingClientRect(),
                trackX = Math.round(trackRect.x),
                diffX = trackRect.width - (mouseX - trackX);

            console.log("WIDTH", trackRect.width);

            slider.style.right = diffX + "px";
        } // end of if max is being slided

        // SET ACTIVE TRACK
        if (this.state.mouseDown) {
            const
                box = document.getElementById(this.props.id + "__track"),
                boxX = Math.round(box.getBoundingClientRect().x),
                track = document.getElementById(this.props.id + "__active-track"),
                minThumb = document.getElementById(this.props.id + "__slider--min"),
                minRect = minThumb.getBoundingClientRect(),
                trackStart = minRect.x + (minRect.width / 2) - boxX,
                maxThumb = document.getElementById(this.props.id + "__slider--max"),
                maxRect = maxThumb.getBoundingClientRect(),
                trackEnd = maxRect.x + (maxRect.width / 2) - boxX,
                trackWidth = Math.max(trackStart, trackEnd) - Math.min(trackStart, trackEnd);

            track.style.width = trackWidth + "px";
            track.style.left = trackStart + "px";

        } // end of if there was a mouseDown
    } // end of handleMouseMove



    render() {
        return (
            <div className="range" id={this.props.id}>
                <span className="range__min-text">{this.state.min}</span>

                <div className="range__body">

                    <div
                        className="range__body__track"
                        id={this.props.id + "__track"}
                        onMouseLeave={() => this.resetMouseDown()}
                        onMouseUp={() => this.resetMouseDown()}
                        onMouseMove={e => this.handleMouseMove(e)}
                    >
                        <div
                            className="range__body__active-track"
                            id={this.props.id + "__active-track"}
                        ></div>

                        <div
                            className="range__body__slider--min"
                            id={this.props.id + "__slider--min"}
                            onMouseDown={e => this.handleMouseDown("min", e)}
                        ></div>

                        <div
                            className="range__body__slider--max"
                            id={this.props.id + "__slider--max"}
                            onMouseDown={e => this.handleMouseDown("max", e)}
                        ></div>
                    </div>
                </div>

                <span className="range__max-text">{this.state.max}</span>
            </div>
        ); // end of return
    } // end of render
} // end of RangeWithTwoSliders