import React, { Component } from "react";

import "./main_menu.css"

export default class MainMenu extends Component {
    render() {
        return (
            <div className="main-menu__icon">
                <div class="main-menu__icon__stripe1"></div>
                <div class="main-menu__icon__stripe2"></div>
                <div class="main-menu__icon__stripe3"></div>
            </div>
        ); // end of return
    } // end of render
} // end of MainMenu