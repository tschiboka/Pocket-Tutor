import React, { Component } from "react";

import "../RotatingButton/RotatingButton.css";

export default class RotatingButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "max": this.props.max.length
        } // end of state declaration
    } // end of constructor



    renderNumbers(max) {
        return (
            <div className="rot-btn__nums">
                <div id="rot-btn__num-prev" className="rot-btn__num">156</div>
                <div id="rot-btn__num-curr" className="rot-btn__num">2675</div>
                <div id="rot-btn__num-next" className="rot-btn__num">34009</div>
            </div>
        );
    } // end of renderNumbers



    render() {
        return (
            <div className="rot-btn">
                <div className="rot-btn__btn-box">
                    <button>&#9650;</button>

                    <button>&#9660;</button>
                </div>
                <div className="rot-btn__num-box">
                    {this.renderNumbers(this.props.max.length)}
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of RotatingButton class