import React, { Component } from "react";

import "../Results/Results.css";

export default class Results extends Component {
    constructor(props) {
        super(props);

        const
            cards = JSON.parse(localStorage.cards),     // get topics from cards, topics not in use won't be displayed
            ctops = cards.map(c => c.topics),           // extract topics (nested array)
            topic = [...new Set([].concat(...ctops))],  // flatten and reduce duplicates
            resul = topic.map(t => {
                //const that = cards.map(c => c.topics.find(""));
                //console.log(that);
            });

        console.log(cards, topic);
        this.state = {
        }
    } // end of constructor



    render() {
        return (
            this.props.visible && <div className="results">
                <div className="results__header">RESULTS</div>

                <div className="results__body">
                    {}
                </div>

                <div className="results__footer">
                    <button onClick={() => this.props.changeView("browse")}>OK</button>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of Results