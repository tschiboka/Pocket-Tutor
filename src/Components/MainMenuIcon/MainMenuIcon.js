import React, { Component } from "react";

import "./main-menu-icon.css"

export default class MainMenuIcon extends Component {
    constructor(props) {
        super(props);
        this.state = { isMenuVisible: false };
    } // end of constructor

    // toggle menu on click
    handleClick() {
        let visibility = this.state.isMenuVisible ? false : true;

        this.setState({ isMenuVisible: visibility });
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