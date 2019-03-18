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
        // only active if mouse was already down
        if (this.state.mouseDown) {
            e.preventDefault();

            // get ten percent for push effect
            const
                track = document.getElementById(this.props.id + "__track"),
                trackRect = track.getBoundingClientRect()

            // SET THUMBS
            // MIN THUMB
            if (this.state.mouseDown === "min") {
                const // get slide and mouse values
                    slider = document.getElementById(this.props.id + "__slider--min"),
                    mouseX = e.clientX,
                    trackX = Math.round(track.getBoundingClientRect().x),
                    diffX = mouseX - trackX;

                slider.style.left = diffX + "px";
            } // end of if min is being slided

            // MAX THUMB
            if (this.state.mouseDown === "max") {
                const // get slide and mouse values
                    slider = document.getElementById(this.props.id + "__slider--max"),
                    sliderRect = slider.getBoundingClientRect(),
                    sliderEnd = sliderRect.right,
                    mouseX = e.clientX,
                    trackX = Math.round(trackRect.x),
                    diffX = trackRect.width - (mouseX - trackX);

                slider.style.right = diffX + "px";
            } // end of if max is being slided

            // SET ACTIVE TRACK
            const
                box = document.getElementById(this.props.id + "__track"),
                boxX = Math.round(box.getBoundingClientRect().x),
                activeTrack = document.getElementById(this.props.id + "__active-track"),
                minThumb = document.getElementById(this.props.id + "__slider--min"),
                minRect = minThumb.getBoundingClientRect(),
                activeTrackStart = minRect.x + (minRect.width / 2) - boxX,
                maxThumb = document.getElementById(this.props.id + "__slider--max"),
                maxRect = maxThumb.getBoundingClientRect(),
                activeTrackEnd = maxRect.x + (maxRect.width / 2) - boxX,
                activeTrackWidth = Math.max(activeTrackStart, activeTrackEnd) - Math.min(activeTrackStart, activeTrackEnd);

            activeTrack.style.width = activeTrackWidth + "px";
            activeTrack.style.left = activeTrackStart + "px";
        } // end of if mouseDown
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