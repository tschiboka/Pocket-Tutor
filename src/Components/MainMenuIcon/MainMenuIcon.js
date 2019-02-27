import React, { Component } from "react";

import "./MainMenuIcon.css"

export default class MainMenuIcon extends Component {
    constructor(props) {
        super(props);
        this.state = { isMenuVisible: false };
    } // end of constructor

    // toggle menu on click
    handleClick() {
        this.props.toggle();
    } // end of handleClick

    render() {
        return (
            <div
                className="main-menu__icon"
                onClick={() => this.handleClick()}>
                <div class="main-menu__icon__stripe1"></div>
                <div class="main-menu__icon__stripe2"></div>
                <div class="main-menu__icon__stripe3"></div>
            </div>
        ); // end of return
    } // end of render
} // end of MainMenu