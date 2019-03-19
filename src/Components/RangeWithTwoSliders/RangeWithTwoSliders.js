import React, { Component } from "react";

import "./RangeWithTwoSliders.css";

export default class RangeWithTwoSliders extends Component {
    constructor(props) {
        super(props);

        const { min, max } = { ...props };
        this.state = {
            min, max,
            "mouseDown": false,
            "innerX": 0
        };
    } // end of constructor



    handleMouseDown(target, e) {
        const
            newState = this.state,
            cursor = e.clientX,
            sliderX = e.target.getBoundingClientRect().x,
            innerX = Math.round(cursor - sliderX);

        newState.mouseDown = target;
        newState.innerX = innerX;

        if (target === "min") { newState.minStartX = e.clientX; }

        if (target === "max") { newState.maxStartX = e.clientX; }
        this.setState(newState);
    } // end of handleMouseDown


    resetMouseDown() {
        const newState = this.state;

        // reset
        newState.mouseDown = false;

        console.log("LEAVE");
        this.setState(newState);
    } // resetMouseDown



    handleMouseMove(e) {
        e.preventDefault();

        // only active if mouse was already down
        if (this.state.mouseDown) {

            const
                track = document.getElementById(this.props.id + "__track"),
                trackRect = track.getBoundingClientRect(),
                minThumb = document.getElementById(this.props.id + "__slider--min"),
                minRect = minThumb.getBoundingClientRect(),
                maxThumb = document.getElementById(this.props.id + "__slider--max"),
                maxRect = maxThumb.getBoundingClientRect(),
                sliderWidth = document.getElementById(this.props.id + "__slider--min").getBoundingClientRect().width,
                percent = (trackRect.width - sliderWidth) / 100,
                sliderMin = document.getElementById(this.props.id + "__slider--min"),
                sliderMax = document.getElementById(this.props.id + "__slider--max");


            // SET THUMBS

            // MIN THUMB
            if (this.state.mouseDown === "min") {
                const // get track and mouse values
                    mouseX = e.clientX - this.state.innerX,
                    trackX = Math.round(trackRect.x),
                    diffX = mouseX - trackX,
                    newMinDigit = Math.round(diffX / percent),
                    newMaxDigit = 100 - Math.round(Number((maxThumb.style.right || "0").match(/\d+/g)[0]) / percent);

                // min slider won't go over 80
                if (newMinDigit <= 80) {
                    // SET MIN SLIDER 
                    sliderMin.style.left = diffX + "px";

                    // PUSH MAX SLIDER
                    if (newMaxDigit - newMinDigit <= 20) {
                        sliderMax.style.right = (100 - (newMinDigit + 20)) * percent + "px";
                    } // end of if two sliders diff is less than 20
                } // end of min is under 80
            } // end of if min is being slided


            // MAX THUMB
            if (this.state.mouseDown === "max") {
                const // get track and mouse values
                    mouseX = e.clientX + this.state.innerX,
                    trackX = Math.round(trackRect.x),
                    diffX = trackRect.width - (mouseX - trackX),
                    newMaxDigit = 100 - (Math.round(diffX / percent)),
                    newMinDigit = Math.round(Number((minThumb.style.left || "0").match(/\d+/g)[0]) / percent);


                // max slider won't go under 20
                if (newMaxDigit >= 20) {
                    // SET MAX SLIDER 
                    sliderMax.style.right = (100 - newMaxDigit) * percent + "px";


                    // PUSH MIN SLIDER
                    if (newMaxDigit - newMinDigit <= 20) {
                        sliderMin.style.left = (newMaxDigit - 20) * percent + "px";
                    } // end of if two sliders diff is less than 20
                } // end of max is over 20
            } // end of if max is being slided


            // SET ACTIVE TRACK
            const
                box = document.getElementById(this.props.id + "__track"),
                boxX = Math.round(box.getBoundingClientRect().x),
                activeTrack = document.getElementById(this.props.id + "__active-track"),
                activeTrackStart = minRect.x + (minRect.width / 2) - boxX,
                activeTrackEnd = maxRect.x + (maxRect.width / 2) - boxX,
                activeTrackWidth = Math.max(activeTrackStart, activeTrackEnd) - Math.min(activeTrackStart, activeTrackEnd);

            activeTrack.style.width = activeTrackWidth + "px";
            activeTrack.style.left = activeTrackStart + "px";


            // DISPLAY RANGE DIGITS
            const
                minDigit = Math.round(Number((minThumb.style.left || "0").match(/\d+/g)[0]) / percent),
                maxDigit = 100 - Math.round(Number((maxThumb.style.right || "0").match(/\d+/g)[0]) / percent);

            document.getElementById(this.props.id + "min-text").innerHTML = minDigit;
            document.getElementById(this.props.id + "max-text").innerHTML = maxDigit;
        } // end of if mouseDown
    } // end of handleMouseMove



    render() {
        return (
            <div
                className="range" id={this.props.id}
                onMouseLeave={() => this.resetMouseDown()}
                onMouseUp={() => this.resetMouseDown()}
            >
                <span
                    className="range__min-text"
                    id={this.props.id + "min-text"}
                >{this.state.min}</span>

                <div className="range__body">

                    <div
                        className="range__body__track"
                        id={this.props.id + "__track"}
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
                            draggable={false}
                        ></div>

                        <div
                            className="range__body__slider--max"
                            id={this.props.id + "__slider--max"}
                            onMouseDown={e => this.handleMouseDown("max", e)}
                            draggable={false}
                        ></div>
                    </div>
                </div>

                <span
                    className="range__max-text"
                    id={this.props.id + "max-text"}
                >{this.state.max}</span>
            </div>
        ); // end of return
    } // end of render
} // end of RangeWithTwoSliders