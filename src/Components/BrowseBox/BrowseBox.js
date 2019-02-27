import React, { Component } from "react";

import "./BrowseBox.css";

export default class BrowseBox extends Component {
    render() {
        return (
            this.props.visible
                ?
                <div className="browse-box">
                    <div className="browse-box__header"></div>

                    <div className="browse-box__body">
                        This is where you put your questions.
                    </div>

                    <div className="browse-box__footer">
                        <div className="browse-box__footer__progress-box"></div>

                        <div className="browse-box__footer__button-box">
                            <button id="browse-box__prev-btn">Prev</button>
                            <button id="browse-box__turn-btn">Turn</button>
                            <button id="browse-box__next-btn">Next</button>
                        </div>
                    </div>
                </div>
                : null
        ); // end of return
    } // end of render
} // end of BrowseBox