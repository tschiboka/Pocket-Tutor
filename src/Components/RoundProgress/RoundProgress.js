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
            timer = setInterval(() => {
                counter += 2.5;

                const newState = this.state;
                newState.currentPercent = (this.props.percent / 100 * counter).toFixed(0);
                this.setState(newState);

                if (counter >= 100) {
                    clearInterval(timer);
                }
            }, 50); // end of timer
    } // end of componentDidMount



    render() {
        const
            R = (Math.min(this.state.width, this.state.height) / 2) - 10,
            totPerc = ((R - 10) * 2 * Math.PI) * 0.75,
            dashStr = "1111111111".replace(/\d/g, `2 ${totPerc / 10 - 2} `) + "2 10000";
        return (
            <div id={this.props.id} className="rnd-progress">
                <svg
                    width={Math.min(this.state.width, this.state.height)}
                    height={Math.min(this.state.width, this.state.height)}
                    preserveAspectRatio="none">

                    <circle
                        id={this.props.id + "__bg-arc"}
                        className="rnd-progress__bg-arc"
                        cx="50%"
                        cy="50%"
                        strokeDasharray={totPerc}
                        r={R - 10}
                    />

                    <circle
                        className="rnd-progress__pc-arc"
                        stroke={this.props.color}
                        cx="50%"
                        cy="50%"
                        r={R - 10}
                        strokeDasharray={((Number(this.props.percent) / 100) * totPerc) + " 10000"}
                    />

                    <circle
                        className="rnd-progress__pc-stroke"
                        cx="50%"
                        cy="50%"
                        r={R - 10}
                        strokeDasharray={dashStr}
                    />
                </svg>
                <div className="rnd-progress__txt">
                    <span>
                        <span id={this.props.id + "__pc-text"} className="rnd-progress__percent">{this.state.currentPercent}%</span>
                        <br />
                        <span className="rnd-progress__name">{this.props.name.match(/.{0,6}/g)[0]}</span>
                    </span>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of RoundProgress

/**

 <text x="50%" y="55%" id={this.props.id + "__pc-text"}>{this.state.currentPercent}%</text>

<text x="50%" y="85%">{this.props.name}</text>


 */