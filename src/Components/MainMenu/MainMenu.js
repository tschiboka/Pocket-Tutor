import React, { Component } from "react";

import "./MainMenu.css";

export default class MainMenu extends Component {
    render() {
        return (
            this.props.visible
                ?
                <div className="main-menu">
                    <ul>
                        <li className="main-menu-item">Topics</li>
                        <li className="main-menu-item">Cards</li>
                        <li className="main-menu-item">Links</li>
                        <li className="main-menu-item">Results</li>
                        <li className="main-menu-item">Test</li>
                        <li className="main-menu-item">Settings</li>
                    </ul>
                </div>
                : null
        )
    }
} // end of MainMenu