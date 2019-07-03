import React, { Component } from "react";

import "../RoundProgress/RoundProgress.css";

export default class RoundProgress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "width": 0,
            "height": 0,
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
                        strokeDasharray={"240 120"}
                        r={R - 10}
                    />
                    <circle
                        class="rnd-progress__pc-arc"
                        cx="50%"
                        cy="50%"
                        r={R - 10}
                        strokeDasharray={((Number(this.props.percent) / 100) * 240) + " 1000"}
                    />
                </svg>
            </div >
        ); // end of return
    } // end of render
} // end of RoundProgress