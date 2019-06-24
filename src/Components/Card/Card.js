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
            chunks = text.split(/(<###.+<###>)/gm),             // chunk text up to plain text and code
            tempOb = chunks.map(ch => /<###.+/gm.test(ch)       // determine if chunk is code or text
                ? { "type": "code", "content": ch }             // if code 
                : { "type": "text", "content": ch }),           // if plain text
            getLan = (txt) => txt.match(/<###lang=.+?>/gm)[0]   // get language tag
                .replace(/<###lang=/, "").replace(/>/, ""),     // extract language
            getTxt = (txt) => txt                               // get text content
                .replace(/<###lang=.+?>/gm, "")                 // get rid of opening tag
                .replace(/<###>/gm, ""),                        // and closing tag
            textOb = tempOb.map(ob => ob.type === "code"        // final text object that includes the language
                ? { "type": getLan(ob.content), "content": getTxt(ob.content) } : ob);

        return textOb;
    } // end of chunkTest 



    markUpText(lang, txt) {
        let markup = txt;

        switch (lang) {
            case "JS": {
                markup = markup.replace(/".*?"/gm, e => "<###green>" + e + "<###>");
                break;
            }
        } // end of swith language

        return markup;
    } // end of maqrkUpText



    syntax(text, isCode, key) {
        console.log(isCode);
        const // dissect text into markup object with type and content
            markups = text.split(/(<###.*?>.*?<###>)/gm)        // recognise markups
                .filter(e => !!e),                              // get rid of empty ones => ""
            dissect = txt => {                                  // create an object with type and content
                let type = "none", content = txt;               // type and content only changes if it has <###xy><###>tag

                if (/<###.+/gm.test(txt)) {                     // if markup extract type
                    type = txt.match(/<###.+?>/gm)[0]           // extract opening tag
                        .replace(/<###/gm, "")                  // cut front
                        .replace(/>/gm, "");                    // cut end
                    content = txt                               // extract content
                        .replace(/<###.+?>/gm, "")              // cut opening tag
                        .replace(/<###>/gm, "");                // cut closing tag
                }                                               // end of IF its a markup
                return { "type": type, "content": content };    // return the object
            },                                                  // end of dissect
            markObjs = markups.map(m => dissect(m)),            // INVOKE DISSECT TEXT HERE
            giveColor = mark => mark.map((obj, i) => {          // return with components
                switch (obj.type) {                             // according to their type
                    case "none": return <span key={i}>{obj.content}</span> // NONE: any text without markup
                    case "green": return <span key={i} className="code--green">{obj.content}</span>
                }                                               // end of swith obj type
            });                                                 // end of giveColor func

        return <span key={key} className={isCode ? "code--code-text" : ""}>{giveColor(markObjs)}</span>;
    } // end of syntax



    formatText(text) {
        const
            textOb = this.chunkText(text), // get the text object with content and language
            finalT = textOb.map(tob => this.markUpText(tob.type, tob.content));

        return <pre>{finalT.map((txt, i) => this.syntax(txt, textOb[i].type !== "text", i))}</pre>;
    } // end of formatText



    render() {
        const CARD = this.props.card || { "id": -1, "question": "", "answer": "", "results": [0, 0], "topics": [""] };
        return (
            <div className="card__card-box">
                <div className="card__card-content">
                    {this.formatText(this.props.turned ? CARD.answer : CARD.question)}
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of Card Component