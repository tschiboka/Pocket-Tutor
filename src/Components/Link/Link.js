import React, { Component } from "react";

import "../Link/Link.css";

export default class Link extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "removeMsg": false,
            "typeDescription": false,
            "typeUrl": false
        }
    } // end of constructor



    toggleProperty(property = "removeMsg") {
        const newState = this.state;
        newState[property] = !newState[property];
        this.setState(newState);
    } // end of toggleProperty



    render() {
        console.log(this.props.id);
        return (
            !this.state.removeMsg
                ? <div className="link" >
                    <div className="link__body">
                        <div className="link__description">{this.props.description}</div>
                        <div className="link__url">{this.props.url}</div>
                    </div>

                    <div className="link__buttons">
                        <div className="link__rewrite-btns">
                            <button>&#9998;</button>

                            <button>&#9998;</button>
                        </div>

                        <button onClick={() => this.toggleProperty()}>-</button>
                    </div>
                </div>
                : <div className="link__remove-msg">
                    <div>Are you sure you wanna remove link?</div>

                    <div>
                        <button onClick={() => { this.toggleProperty(); return this.props.remove(this.props.id) }}>Yes</button>

                        <button onClick={() => this.toggleProperty()}>No</button>
                    </div>
                </div>


        ); // end of return
    } // end of render
} // end of Link