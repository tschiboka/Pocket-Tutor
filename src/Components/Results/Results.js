import React, { Component } from "react";

import "../Results/Results.css";
import RoundProgress from "../RoundProgress/RoundProgress";

export default class Results extends Component {
    constructor(props) {
        super(props);

        const
            cards = JSON.parse(localStorage.cards),     // get topics from cards, topics not in use won't be displayed
            ctops = cards.map(c => c.topics),           // extract topics (nested array)
            topic = [...new Set([].concat(...ctops))],  // flatten and reduce duplicates
            resul = topic.map(t => {
                const
                    allResultOnTopic = cards
                        .map(c => c.topics              // get cards
                            .find(to => to === t) ? c.results : [0, 0]) // find topic in cards and get results
                        .reduce((prev, curr) => [prev[0] + curr[0], prev[1] + curr[1]]), // add results together
                    precentage = allResultOnTopic[0]    // calculate pecentage from [success, all]
                        ? Math.round((allResultOnTopic[0] / allResultOnTopic[1]) * 100)
                        : 0,                            // else 0
                    color = JSON.parse(localStorage.topics) // get localStorage topics
                        .find(to => to.name === t).color; // find corrisponding color

                return { "topicName": t, "color": color, "percent": precentage }
            }) // end of topic.map
                .sort((a, b) => a.topicName.toUpperCase() > b.topicName.toUpperCase()); // sort obj case insensitive

        this.state = { "results": resul };
    } // end of constructor



    render() {
        const layout = this.state.results <= 8 ? "two-rows" : "three-rows";
        return (
            this.props.visible && <div className="results">
                <div className="results__header">RESULTS</div>

                <div className={"results__body results__body--" + layout}>
                    {
                        this.state.results.map((res, i) => (
                            <div className={"results__item results-item--" + layout} key={i}>
                                <RoundProgress
                                    key={i}
                                    id={"results__percent--" + i}
                                    percent={res.percent}
                                    color={res.color}
                                    name={res.topicName}
                                />
                            </div>))
                    }
                </div>

                <div className="results__footer">
                    <button onClick={() => this.props.changeView("browse")}>OK</button>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of Results