import React, { Component } from "react";

import "../RoundProgress/RoundProgress.css";

export default class RoundProgress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "width": 0,
            "height": 0,
            "currentPercent": 0
        } // end of state declaration
    } // end of constructor



    componentDidMount() {
        const                                               // get Components width and height
            comp = document.getElementById(this.props.id),  // get component elememnt
            rect = comp.getBoundingClientRect(),            // get rectangle
            newState = this.state;                          // copy state

        newState.height = Math.round(rect.height);          // set width
        newState.width = Math.round(rect.width);            // set height
        this.setState(newState);

        let counter = 0;
        const
            text = this.props.id + "__pc-text",
            timer = setInterval(() => {
                counter += 2.5;

                const newState = this.state;
                newState.currentPercent = (this.props.percent / 100 * counter).toFixed(0);
                this.setState(newState);

                if (counter >= 100) {
                    clearInterval(timer);
                }
            }, 75);

    } // end of componentDidMount



    render() {
        const
            R = Math.min(this.state.width, this.state.height) / 2 - 10;
        return (
            <div id={this.props.id} class="rnd-progress">
                <svg preserveAspectRatio="none">

                    <circle
                        id={this.props.id + "__bg-arc"}
                        class="rnd-progress__bg-arc"
                        cx="50%"
                        cy="50%"
                        strokeDasharray={"240 1000"}
                        r={R - 10}
                    />

                    <circle
                        class="rnd-progress__pc-arc"
                        stroke={this.props.color}
                        cx="50%"
                        cy="50%"
                        r={R - 10}
                        strokeDasharray={((Number(this.props.percent) / 100) * 240) + " 1000"}
                    />

                    <circle
                        class="rnd-progress__pc-stroke"
                        cx="50%"
                        cy="50%"
                        r={R - 10}
                    />

                    <text x="50%" y="55%" id={this.props.id + "__pc-text"}>{this.state.currentPercent}%</text>

                    <text x="50%" y="85%">{this.props.name}</text>
                </svg>
            </div >
        ); // end of return
    } // end of render
} // end of RoundProgress