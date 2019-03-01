import React, { Component } from 'react';
import './App.css';

import Searchbar from "./Components/Searchbar/Searchbar";
import MainMenuIcon from './Components/MainMenuIcon/MainMenuIcon';
import MainMenu from "./Components/MainMenu/MainMenu";
import BrowseBox from "./Components/BrowseBox/BrowseBox";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMainMenuVisible: false, // main menu is invisible by default
      view: "browse"            // default view is browse (user can read random cards)
    }; // end of state declaration
  } // end of constructor

  toggleMainMenu() {
    let visibility = this.state.isMainMenuVisible ? false : true;

    this.setState({
      isMainMenuVisible: visibility,
      view: this.state.view
    }); // end of setState
  } // end of toggleMainMenu

  render() {
    return (
      <div className="App">
        <header>
          <MainMenuIcon toggle={this.toggleMainMenu.bind(this)} />

          <Searchbar />
        </header>

        <BrowseBox visible={this.state.view === "browse"} />

        <MainMenu visible={this.state.isMainMenuVisible} />
      </div>
    ); // end of return
  } // end of render
} // end of App