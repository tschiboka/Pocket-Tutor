import React, { Component } from "react";

import Link from "../Link/Link";

import "../Links/Links.css";

export default class Links extends Component {
    constructor(props) {
        super(props);
    } // end of constructor



    // check if links is available in localStorage before rendering
    componentWillReceiveProps() {
        if (!localStorage.links) localStorage.setItem("links", "[]");
    } // end of comnponentWillRecieveProps


    addLink() {

    } // end of addLink



    renderLinks(links) {
        console.log(links);
        return links.map((l, i) => <Link key={i} description={l.description} url={l.url} />);
    } // end of renderLinks



    render() {
        const links = JSON.parse(localStorage.links);
        return (
            this.props.visible &&
            <div className="links">
                <div className="links__header">
                    <button onClick={() => this.props.changeView("browse")}>&larr;</button>

                    Links

                    <button onClick={() => this.addLink()}>+</button>
                </div>

                <div className="links__body">{this.renderLinks(links)}</div>
            </div>
        ) // end of return
    } // end of render
} // end of Links