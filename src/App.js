import React, { Component } from 'react';
import './App.css';

import Searchbar from "./Components/Searchbar/Searchbar";
import MainMenuIcon from './Components/MainMenuIcon/MainMenuIcon';
import MainMenu from "./Components/MainMenu/MainMenu";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMainMenuVisible: false };
  } // end of constructor

  toggleMainMenu() {
    let visibility = this.state.isMainMenuVisible ? false : true;

    this.setState({ isMainMenuVisible: visibility });
  } // end of toggleMainMenu

  render() {
    return (
      <div className="App">
        <header>
          <MainMenuIcon toggle={this.toggleMainMenu.bind(this)} />

          <Searchbar />
        </header>

        <MainMenu visible={this.state.isMainMenuVisible} />
      </div>
    );
  }
}