import React, { Component } from "react";

import "./EditCards.css";

export default class EditCards extends Component {
    render() {
        console.log(this.props.id);
        return (
            <div className="edit-cards">
                <div className="edit-cards__inner">
                    <div className="edit-cards__header">
                        <span>Edit Cards</span>

                        <span>{this.props.id}</span>
                    </div>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of EditCards