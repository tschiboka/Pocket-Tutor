import React, { Component } from "react";

import "../Card/Card.css";

export default class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {

        } // end of state declaration
    } // end of constructor



    // function returns an array of objects with the text type or language and its content
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

        return textOb;
    } // end of chunkTest 


    formatText(text) {
        const
            textOb = this.chunkText(text), // get the text object with content and language
            finalT = textOb.map(tob => {   // the final text function
                let content = "";

                switch (tob.type) {
                    case "JS": { content = "JS"; break; }
                    case "CSS": { content = "CSS"; break; }
                    case "text": { content = "text"; break; }
                } // end of swith
                return content;
            }).join("");

        return finalT;
    } // end of formatText



    render() {
        const CARD = this.props.card || { "id": -1, "question": "", "answer": "", "results": [0, 0], "topics": [""] };
        return (
            <div className="card__card-box">
                {this.formatText(this.props.turned ? CARD.answer : CARD.question)}
            </div>
        ); // end of return
    } // end of render
} // end of Card Component