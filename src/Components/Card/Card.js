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
                dissectText(/\/\*[\s\S]*?\*\//g, "grey");       // get multiline comments
                dissectText(/\/\/.*/gm, "grey");                // get single line comments
                dissectText(/("|'|`).*?("|'|`)/gm, "green");    // get STRINGS
                dissectText(/(=>|===|!==|==|!=|\||&|>|<|>=|>=|!|\.\.\.)/gm, "pink"); // get signs
                dissectText(/(\s|^)(break|case|catch|continue|debugger|default|delete|do|else|finally|for|function|if|in|instanceof|new|return|switch|this|throw|try|typeof|var|void|while|with)(?=\s|\W)/gm, "yellow"); // keywords
                dissectText(/(\s|^)(class|const|enum|export|extends|default|import|super)(?=\s|\W)/gm, "yellow"); // keywords
                dissectText(/(\s|^)(implements|interface|let|package|private|protected|public|static|yield)(?=\s|\W)/gm, "yellow"); // reserved keywords
                dissectText(/(\s|^|\W)(null|true|false|NaN|Infinity|undefined|globalThis)(?=\s|\W)/gm, "pink"); // reserved keywords
                dissectText(/\w+\s*(?=\()/gm, "blue");          // get functions
                dissectText(/(\s|^|[\(\[])(Number|BigInt|Math|Date|String|RegExp|Array|Map|Set|WeakMap|WeakSet|JSON|Promise|Generator|Reflect|Proxy|Object|Function|Boolean|Symbol|Error|EvalError|RangeError|InternalError|ReferenceError|SyntaxError|TypeError|URIError)(?=\s|.|\()/gm, "pink"); // global functions and objs
                dissectText(/\.()\s*(?=\(eval|uneval|isFinite|isNaN|parseFloat|parseInt|decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|escape|unescape)/gm, "pink"); // get global functions
                dissectText(/(\d+)(?!\d*\u00ac)/gm, "orange");  // get NUMBERS except the ones ending ¬
                dissectText(/[+-/*:.]/gm, "lblue");             // get mathematical signs
                dissectText(/[\(\)\{\}\[\];,]+/gm, "white");    // get brackets
                dissectText(/[?:"£$%^&*=~#@]/gm, "purple");     // get rest of the characters
                break;
            }                                                   // end of case JS
            case "CSS": {                                       // CSS   
                dissectText(/\/\*[\s\S]*?\*\//g, "grey");       // get multiline comments
                dissectText(/\.[\w-]+(?=[ \t\S]*{)/gm, "orange");// get class selectors
                dissectText(/\#[\w-]+(?=[ \t\S]*{)/gm, "lblue");// get id selectors
                dissectText(/\@[\w- ]+(?=[ \t\S]*{)/gm, "purple");// get keyframes and fontface 
                dissectText(/(::|:)+[\w-]+(?=[ \t\S]*{)/gm, "blue");// get pseudo selectors
                dissectText(/(\w+|-)+\s*(?=\()/gm, "blue");     // get functions
                dissectText(/(abbr|acronym|address|applet|article|area|aside|audio|base|bdo|big|blockquote|body)(?=[ \t\S]*{)/gm, "purple"); // html tag names
                dissectText(/(button|canvas|caption|center|cite|code|colgroup|datalist|del|dfn|div|embed)(?=[ \t\S]*{)/gm, "purple"); // html tag names
                dissectText(/(fieldset|figcaption|figure|font|footer|form|frameset|header|head|h1|h2|h3|h4|h5|h6|hr)(?=[ \t\S]*{)/gm, "purple"); // html tag names
                dissectText(/(iframe|img|input|kbd|label|legend|link|main|map|mark|meta|meter|nav|noscript|object)(?=[ \t\S]*{)/gm, "purple"); // html tag names
                dissectText(/(optgoup|option|param|progress|samp|script|section|select|small|source|span|strike|strong)(?=[ \t\S]*{)/gm, "purple"); // html tag names
                dissectText(/(table|tbody|textarea|tfoot|th|thead|time|title|var|video|wbr)(?=[ \t\S]*{)/gm, "purple"); // html tag names
                dissectText(/(ins|em|dl|dd|col|pre|sub|sup|br|td|tr|ol|ul|li|u|i|a|b|s|q|p)(?=[ \t\S]*{)/gm, "purple"); // html tag names
                dissectText(/(initial|inherit|unset|none)(?=\s*|;)/gm, "orange"); // keywords
                dissectText(/("|'|`).*?("|'|`)/gm, "green");    // get STRINGS
                dissectText(/#[\dabcde]+/gm, "blue");           // get hex colors
                dissectText(/(\d+)(?!\d*\u00ac)/gm, "lblue");   // get NUMBERS except the ones ending ¬
                dissectText(/\s-[\w-]+(?=[ \t\S]*:)/gm, "lblue");// get browser specific properties
                dissectText(/\s[\w-]+(?=[ \t\S]*:)/gm, "white");// get properties
                dissectText(/(absolute|all-scroll|all|alias|alternate-reverse|alternate|avoid|always|armenian|auto|backwards|balance|baseline|blink|block|bolder|bold|border-box|both|break-all|break-word|capitalize|cell|caption|circle|collapse|condensed|contain|contents|content-box|context-menu|column-reverse|column|copy|cover|counter|close-quote|crosshair|dashed|decimal-leading-zero|decimal|default|disc|distribute|dotted|double|ease-in-out|ease-in|ease-out|ease|end|expanded|extra-condensed|extra-expanded|fixed|forwards|flat|flow-root|flow|fixed|flex-end|flex-start|flex|gregorian|grid|groove|help|hidden|hide|horizontal|icon|infinite|inline-block|inline-flex|inline-grid|inline-table|inline|inset|inside|inter-word|italic|justify|keep-all|large|length|lighter|line-through|linear|list-item|lowercase|lower-alpha|lower-greek|lower-latin|lower-roman|ltr|no-close-quote|no-drop|not-allowed|ne-size|nwse-resize|no-open-quote|medium|menu|message-box|no-repeat|nowrap|normal|oblique|open-quote|outset|outside|overline|padding-box|paused|percentage|pointer|progress|preserve|pre-line|pre-wrap|pre|relative|repeat-x|repeat-y|repeat|reverse|ridge|round|row-reverse|row|rtl|run-in|running|scroll|semi-condendes|semi-expanded|separate|show|smaller|small-caps|small-caption|small|solid|space-around|space-between|space|square|status-bar|start|static|sticky|stretch|table-caption|table-column-group|table-header-group|table-footer-group|table-row-group|table-cell|table-column|table-row|table|text|thick|thin|ultra-condensed|ultra-expanded|underline|uppercase|upper-alpha|upper-latin|upper-roman|visible|vertical-text|vertical|wait|wavy|wrap-reverse|wrap|xx-large|x-large|xx-small|x-small|zoom-in|zoom-out)+(?=[ \t\S;]*)/gmi, "none"); // property values
                dissectText(/(left|center|right|top|bottom)+(?=[ \t\S;]*)/gmi, "pink"); // positionings
                dissectText(/(AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenRod|DarkGray|DarkGrey|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|Darkorange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkSlateGrey|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DimGrey|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|GoldenRod|Gray|Grey|Green|GreenYellow|HoneyDew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCoral|LightCyan|LightGoldenRodYellow|LightGray|LightGrey|LightGreen|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSlateGrey|LightSteelBlue|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquaMarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenRod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|SeaShell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|SlateGrey|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen|transparent)+(?=[ \t\S;]*)/gmi, "purple"); // color names
                dissectText(/(em|ex|cap|ch|ic|rem|lh|rlh|vw|vh|vi|vb|vmin|vmax)+(?=[ \t;]+)/gmi, "pink"); // relative units
                dissectText(/(dpcm|dppx|cm|mm|Q|in|pc|pt|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi)+(?=[ \t;]+)/gmi, "pink"); // absolute units
                dissectText(/[+-/*.]/gm, "purple");             // get mathematical signs
                dissectText(/[?"£$%^&*=~#@,]/gm, "purple");     // get rest of the characters
                dissectText(/[\(\)\{\}\[\];:]+/gm, "white");    // get brackets
                break;
            }                                                   // end of CSS
            case "HTML": {                                      // HTML
                dissectText(/<!--[\s\S]*?-->/g, "grey");        // get multiline comments
                dissectText(/("|'|`).*?("|'|`)/gm, "green");    // get STRINGS
                dissectText(/[\w-]+(?==)/gm, "blue");           // get attributes
                dissectText(/&.{0,8};/gm, "pink");              // get entities
                dissectText(/(<|>|\/|;|=)/gm, "white");         // get signs
            }                                                   // end of HTML
            default: { }                                        // React cries for default
        }                                                       // end of swith language

        const getIndex = i => Number(i.replace(/\D+/g, ""));    // extract index from <¬Index¬>
        return markup.replace(/\u00ac\d+?\u00ac/gm,             // get <¬Number¬>
            i => markupArray[getIndex(i)]);                     // replace the syntaxised markup from array
    } // end of maqrkUpText



    // function returns react dom elements
    syntax(text, isCode, key) {
        if (!text.length) return <span></span> // return on empty strings

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

        return isCode
            ? <pre key={key}><span className="code--code-text">{giveColor(markObjs)}</span></pre>
            : <span key={key} className="code--plain-text">{
                text.split("\n")
                    .map((txt, i) => <span key={i}>{txt}<br /></span>)
            }</span>;
    } // end of syntax



    formatText(text) {
        const
            textOb = this.chunkText(text),                      // get the text object with content and language
            finalT = textOb.map(tob => this.markUpText(tob.type, tob.content));

        return <span>{finalT.map((txt, i) => this.syntax(txt, textOb[i].type !== "text", i))}</span>;
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