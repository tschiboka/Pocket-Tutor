import React, { Component } from "react";

import "../Link/Link.css";

export default class Link extends Component {
    constructor(props) {
        super(props);

        this.state = {
            "removeMsg": false,
            "typeDescription": false,
            "typeUrl": false,
        } // end of state declaration
    } // end of constructor



    toggleProperty(property = "removeMsg") {
        const newState = this.state;
        newState[property] = !newState[property];
        this.setState(newState);
    } // end of toggleProperty



    submitInput(inputName) {
        const inpVal = document.getElementById("link__input--" + inputName + this.props.id).value;

        this.props.update(this.props.id, inputName, inpVal);
        this.toggleProperty("type" + inputName[0].toUpperCase() + inputName.substr(1));
    } // end of submitInput



    render() {
        console.log(this.props.id);
        return (
            !this.state.removeMsg
                ? <div className="link" >
                    <div className="link__body">
                        {this.state.typeDescription
                            ? <input
                                id={"link__input--description" + this.props.id}
                                type="text"
                                defaultValue={this.props.description} />
                            : <div id={"link__description" + this.props.id}>{this.props.description}</div>}

                        {this.state.typeUrl
                            ? <input
                                id={"link__input--url" + this.props.id}
                                type="text"
                                defaultValue={this.props.url} />
                            : <div id={"link__url" + this.props.id}>
                                <button onClick={() => { window.open(this.props.url, "_blank") }}>GO</button>

                                <div>{this.props.url}</div></div>}
                    </div>

                    <div className="link__buttons">
                        <div className="link__rewrite-btns">
                            {this.state.typeDescription
                                ? <button onClick={() => this.submitInput("description")}>&#10004;</button>
                                : <button onClick={() => this.toggleProperty("typeDescription")}>&#9998;</button>}

                            {this.state.typeUrl
                                ? <button onClick={() => this.submitInput("url")}>&#10004;</button>
                                : <button onClick={() => this.toggleProperty("typeUrl")}>&#9998;</button>}
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