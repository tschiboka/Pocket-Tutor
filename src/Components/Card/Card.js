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
        let
            markup = txt,                                       // the text recieved as parameter
            index = 0;                                          // keeps tracking the markup indexing
        const markupArray = [];                                 // the array that places the syntaxed text back

        function dissectText(regexp, color) {                   // dissect the markup into pieces of syntax, so it wont match other regexp
            markup = markup.replace(regexp, match => {          // eg "text123" wont match 123 as a number but a string
                markupArray.push(`<###${color}>${match}<###>`); // push the result with syntax coloring
                return "¬" + index++ + "¬";                     // sign piece of text with a number eg ¬number
            });                                                 // end of replace
        }                                                       // end of dissectText

        switch (lang) {                                         // languages get different syntax
            case "JS": {                                        // JS
                dissectText(/\/\*[\s\S]*\*\//g, "grey");        // get multiline comments
                dissectText(/\/\/.*/gm, "grey");                // get single line comments
                dissectText(/("|'|`).*?("|'|`)/gm, "green");    // get STRINGS
                dissectText(/(=>|===|!==|==|!=|\||&|>|<|>=|>=|!|\.\.\.)/gm, "pink"); // get signs
                dissectText(/\w+\s*(?=\()/gm, "blue");          // get functions
                dissectText(/(\s|^)(break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)(?=\s)/gm, "yellow"); // keywords
                dissectText(/(\s|^)(class|const|enum|export|extends|default|import|super)(?=\s)/gm, "yellow"); // keywords
                dissectText(/(\s|^)(implements|interface|let|package|private|protected|public|static|yield)(?=\s)/gm, "yellow"); // reserved keywords
                dissectText(/(\s|^)(null|true|false|NaN|Infinity|undefined)(?=\s|\W)/gm, "yellow"); // reserved keywords
                dissectText(/(\d+)(?!\d*\u00ac)/gm, "orange");  // get NUMBERS except the ones ending ¬
                dissectText(/[+-/*:.]/gm, "lblue");           // get mathematical signs
                dissectText(/[\(\)\{\}\[\];,]+/gm, "white");    // get brackets
                dissectText(/[?:"£$%^&*=~#@']/gm, "purple");   // get rest of the characters
                break;
            }                                                   // end of case JS
            default: { }                                        // React cries for default
        }                                                       // end of swith language

        const getIndex = i => Number(i.replace(/\D+/g, ""));    // extract index from <¬Index¬>
        return markup.replace(/\u00ac\d+?\u00ac/gm,             // get <¬Number¬>
            i => markupArray[getIndex(i)]);                     // replace the syntaxised markup from array
    } // end of maqrkUpText



    // function returns react dom elements
    syntax(text, isCode, key) {
        const // dissect text into markup object with type and content
            markups = text.split(/(<###.*?>[\s\S]*?<###>)/gm)   // recognise markups
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
                    case "orange": return <span key={i} className="code--orange">{obj.content}</span>
                    case "lblue": return <span key={i} className="code--lightblue">{obj.content}</span>
                    case "white": return <span key={i} className="code--white">{obj.content}</span>
                    case "purple": return <span key={i} className="code--purple">{obj.content}</span>
                    case "grey": return <span key={i} className="code--grey">{obj.content}</span>
                    case "blue": return <span key={i} className="code--blue">{obj.content}</span>
                    case "yellow": return <span key={i} className="code--yellow">{obj.content}</span>
                    case "pink": return <span key={i} className="code--pink">{obj.content}</span>
                }                                               // end of swith obj type
            });                                                 // end of giveColor func

        return <span key={key} className={isCode ? "code--code-text" : ""}>{giveColor(markObjs)}</span>;
    } // end of syntax



    formatText(text) {
        const
            textOb = this.chunkText(text),                      // get the text object with content and language
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