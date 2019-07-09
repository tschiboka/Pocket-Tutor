import React, { Component } from "react";

import "../Links/Links.css";

export default class Links extends Component {
    render() {
        return (
            this.props.visible &&
            <div className="links">
                <div className="links__header">
                    <button>&larr;</button>

                    Links

                    <button>+</button>
                </div>
            </div>
        ) // end of return
    } // end of render
} // end of Links