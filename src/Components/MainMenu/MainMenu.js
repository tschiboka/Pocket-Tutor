import React, { Component } from "react";

import "./MainMenu.css";

import topics_icon from "./../../images/topics-icon.png";
import cards_icon from "./../../images/cards-icon.png";
import links_icon from "./../../images/links-icon.png";
import result_icon from "./../../images/result-icon.png";
import test_icon from "./../../images/test-icon.png";
import settings_icon from "./../../images/settings-icon.png";

export default class MainMenu extends Component {
    render() {
        return (
            this.props.visible
                ?
                <div className="main-menu">
                    <ul>
                        <li className="main-menu-item" id="main-menu__topics">
                            <div>
                                <img src={topics_icon} alt="topics" />
                                Topics
                            </div>
                        </li>

                        <li className="main-menu-item" id="main-menu__cards">
                            <div>
                                <img src={cards_icon} alt="cards" />
                                Cards
                            </div>
                        </li>

                        <li className="main-menu-item" id="main-menu__links">
                            <div>
                                <img src={links_icon} alt="links" />
                                Links
                            </div>
                        </li>

                        <li className="main-menu-item" id="main-menu__results">
                            <div>
                                <img src={result_icon} alt="results" />
                                Results
                            </div>
                        </li>

                        <li className="main-menu-item" id="main-menu__test">
                            <div>
                                <img src={test_icon} alt="test" />
                                Test
                            </div>
                        </li>

                        <li className="main-menu-item" id="main-menu__settings">
                            <div>
                                <img src={settings_icon} alt="settings" />
                                Settings
                            </div>
                        </li>
                    </ul>
                </div>
                : null
        )
    }
} // end of MainMenu