import React, { Component } from "react";

import "./MainMenu.css";

import topics_icon from "./../../images/topics-icon.png";
import cards_icon from "./../../images/cards-icon.png";
import links_icon from "./../../images/links-icon.png";
import result_icon from "./../../images/result-icon.png";
import test_icon from "./../../images/test-icon.png";
import settings_icon from "./../../images/settings-icon.png";

export default class MainMenu extends Component {
    componentDidUpdate() {
        this.focusMenu();
    }

    focusMenu() {
        if (document.getElementsByClassName("main-menu").length) {
            document.getElementsByClassName("main-menu")[0].focus();
        }
    }

    handleBlur(e) {
        if (this.props.visible) this.props.toggle(e);
    }

    handleMenuItemClick(item) {
        this.props.toggle();

        this.props.changeView(item);
    } // end of handle MenuItemClick

    render() {
        // menu gets focus, element has to be displayed and visible, so my solution was to hide it behind
        const
            hiddenStyle = { zIndex: "-1" },
            visibleStyle = { zIndex: "1000" }

        return (
            <div
                className="main-menu"
                style={this.props.visible ? visibleStyle : hiddenStyle}
                tabIndex={1}
                onBlur={e => { this.handleBlur(e) }}
            >
                <ul>
                    <li
                        className="main-menu-item"
                        id="main-menu__topics"
                        key="topics"
                        onClick={() => this.handleMenuItemClick("topics")}
                    >
                        <div>
                            <img src={topics_icon} alt="topics" />
                            Topics
                            </div>
                    </li>

                    <li
                        className="main-menu-item"
                        id="main-menu__cards"
                        key="cards"
                        onClick={() => this.handleMenuItemClick("cards")}
                    >
                        <div>
                            <img src={cards_icon} alt="cards" />
                            Cards
                            </div>
                    </li>

                    <li
                        className="main-menu-item"
                        id="main-menu__links"
                        key="links"
                    >
                        <div>
                            <img src={links_icon} alt="links" />
                            Links
                            </div>
                    </li>

                    <li
                        className="main-menu-item"
                        id="main-menu__results"
                        key="results"
                    >
                        <div>
                            <img src={result_icon} alt="results" />
                            Results
                            </div>
                    </li>

                    <li
                        className="main-menu-item"
                        id="main-menu__test"
                        key="test"
                    >
                        <div>
                            <img src={test_icon} alt="test" />
                            Test
                            </div>
                    </li>

                    <li
                        className="main-menu-item"
                        id="main-menu__settings"
                        key="settings"
                    >
                        <div>
                            <img src={settings_icon} alt="settings" />
                            Settings
                            </div>
                    </li>
                </ul>
            </div>
        )
    }
} // end of MainMenu