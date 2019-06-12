import React, { Component } from "react";

import "../Card/Card.css";

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {

        } // end of state declaration
    } // end of constructor



    render() {
        const CARD = this.props.card || { "id": -1, "question": "", "answer": "", "results": [0, 0], "topics": [""] };
        console.log(CARD);
        return (
            <div className="card__card-box">{CARD.question}</div>
        ); // end of return
    } // end of render
} // end of Card Component