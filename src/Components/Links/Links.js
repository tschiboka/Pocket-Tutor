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


    addLink(links) {
        links.push({ "description": "", "url": "" });

        localStorage.setItem("links", JSON.stringify(links));

        this.forceUpdate();
    } // end of addLink



    removeLink(id) {
        const links = JSON.parse(localStorage.links);

        links.splice(id, 1);
        localStorage.setItem("links", JSON.stringify(links));

        this.forceUpdate();
    } // end of removeLink



    updateLink(id, property, value) {
        const links = JSON.parse(localStorage.links);

        links[id][property] = value;

        localStorage.setItem("links", JSON.stringify(links));
        console.log(id, property);

        this.forceUpdate();
    } // end of updateLink



    renderLinks(links) {
        console.log(links);
        return links.map((l, i) =>
            <Link
                key={i}
                id={i}
                description={l.description}
                remove={this.removeLink.bind(this)}
                update={this.updateLink.bind(this)}
                url={l.url} />);
    } // end of renderLinks



    render() {
        const links = JSON.parse(localStorage.links);
        return (
            this.props.visible &&
            <div className="links">
                <div className="links__header">
                    <button onClick={() => this.props.changeView("browse")}>&larr;</button>

                    Links

                    <button onClick={() => this.addLink(links)}>+</button>
                </div>

                <div className="links__body">{this.renderLinks(links)}</div>
            </div>
        ) // end of return
    } // end of render
} // end of Links