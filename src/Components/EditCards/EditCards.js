import React, { Component } from "react";

import "./EditCards.css";

export default class EditCards extends Component {
    constructor(props) {
        super(props);

        const cards = JSON.parse(localStorage.cards);

        this.state = {
            "id": this.props.id || ++cards[cards.length - 1].id,    // if no id is provided by prop create one (last ind id plus one)
            "card": cards.find(c => c.id === this.props.id) ||      // get card if id is found, so EditCard can be filled up 
                {
                    "id": this.props.id, // id still can be null, later on will be assigned in didRender
                    "question": "",
                    "answer": "",
                    "results": [0, 0],
                    "topic": []
                },  // end of empty card def
        } // end of state declaration
    } // end of constructor



    componentDidMount() {
        const newState = this.state;

        newState.card.id = this.state.id; // now card recieves the correct id in case it wasn't declaredb (id: null in props)

        this.setState(newState);
    } // end of componentDidMount



    render() {
        console.log(this.props.id, this.state.card);
        return (
            <div className="edit-cards">
                <div className="edit-cards__inner">
                    <div className="edit-cards__header">
                        <span>Edit Cards</span>

                        <span>id:{this.state.id} results: {this.state.card.results[0]} of {this.state.card.results[1]}</span>
                    </div>

                    <div className="edit-cards__body">
                        <div className="edit-cards__topics-box"></div>

                        <div className="edit-cards__question-box"></div>

                        <div className="edit-cards__answer-box"></div>
                    </div>
                </div>
            </div>
        ); // end of return
    } // end of render
} // end of EditCards