import React, { Component } from "react";

import "../Link/Link.css";

export default class Link extends Component {
    constructor(props) {
        super(props);

        this.state = { "clicked": false }
    } // end of constructor

    render() {
        return (
            <div className="link">
                <div className="link__body">
                    <div className="link__description">{this.props.description}</div>
                    <div className="link__url">{this.props.url}</div>
                </div>

                <div className="link__buttons">
                    <div className="link__rewrite-btns">
                        <button>&#9998;</button>

                        <button>&#9998;</button>
                    </div>

                    <button>-</button>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of Link