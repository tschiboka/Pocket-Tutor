import React, { Component } from "react";

import "../Card/Card.css";

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {

        } // end of state declaration
    } // end of constructor



    // function returns a styled text with syntax highlighting
    synthaxCard(text) {
        const
            code = text.match(/<###.###>/g);

        console.log(code);
        return text;
    } // end of synthaxCard



    render() {
        const CARD = this.props.card || { "id": -1, "question": "", "answer": "", "results": [0, 0], "topics": [""] };
        return (
            <div className="card__card-box">
                {this.synthaxCard(this.props.turned ? CARD.answer : CARD.question)}
            </div>
        ); // end of return
    } // end of render
} // end of Card Component