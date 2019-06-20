import React, { Component } from "react";

import "../Card/Card.css";

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {

        } // end of state declaration
    } // end of constructor



    // function returns an object with the text type or language and its content
    chunkText(text) {
        const
            chunks = text.split(/(<###.+<###>)/gm),           // chunk text up to plain text and code
            tempOb = chunks.map(ch => /<###.+/gm.test(ch)     // determine if chunk is code or text
                ? { "type": "code", "content": ch }           // if code 
                : { "type": "text", "content": ch }),         // if plain text
            getLan = (txt) => txt.match(/<###lang=.+?>/gm)[0] // get language tag
                .replace(/<###lang=/, "").replace(/>/, ""),   // extract language
            textOb = tempOb.map(ob => ob.type === "code"      // final text object that includes the language
                ? { "type": getLan(ob.content), "content": ob.constent } : ob);

        return JSON.stringify(textOb);
    } // end of synthaxCard 



    render() {
        const CARD = this.props.card || { "id": -1, "question": "", "answer": "", "results": [0, 0], "topics": [""] };
        return (
            <div className="card__card-box">
                {this.chunkText(this.props.turned ? CARD.answer : CARD.question)}
            </div>
        ); // end of return
    } // end of render
} // end of Card Component