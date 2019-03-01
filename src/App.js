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

  extendMainMenu() {
    this.setState({
      isMainMenuVisible: true,
      view: this.state.view
    }); // end of setState
  } // end of toggleMainMenu

  closeMainMenu(e) {
    const delay = setTimeout(() => {
      this.setState({
        isMainMenuVisible: false,
        view: this.state.view
      }); // end of setState
    }, 100);
  } // end of toggleMainMenu

  render() {
    return (
      <div className="App">
        <header>
          <MainMenuIcon
            toggle={this.extendMainMenu.bind(this)}
          />

          <Searchbar />
        </header>

        <BrowseBox visible={this.state.view === "browse"} />

        <MainMenu
          visible={this.state.isMainMenuVisible}
          toggle={this.closeMainMenu.bind(this)}
        />
      </div>
    ); // end of return
  } // end of render
} // end of App[]