import React, { Component } from 'react';
import './App.css';

import Searchbar from "./Components/Searchbar/Searchbar";
import MainMenuIcon from './Components/MainMenuIcon/MainMenuIcon';
import MainMenu from "./Components/MainMenu/MainMenu";
import BrowseBox from "./Components/BrowseBox/BrowseBox";
import Topics from "./Components/Topics/Topics";
import Cards from "./Components/Cards/Cards";
import EditCards from "./Components/EditCards/EditCards";

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
        "isMainMenuVisible": false,
        "view": this.state.view,
        "editCardVisible": false
      }); // end of setState
      clearTimeout(delay);
    }, 200);
  } // end of toggleMainMenu



  changeView(view) {
    this.setState({
      isMainMenuVisible: this.state.isMainMenuVisible,
      view: view
    }); // end of setState
  } // end of changeView



  setLocalStorage() {
    // set default localstorage falues in case missing or first visit
    if (!localStorage.cards) { localStorage.setItem("cards", "[]") }
    if (!localStorage.topics) { localStorage.setItem("topics", "[]") }
  } // end of setLocalStorage



  // edit cards can be opened form multiple places thoughout the app
  openCloseEditCards(isOpen) {
    const newState = this.state;

    newState.editCardVisible = isOpen;

    this.setState(newState);
  } // end of openCloseEditCards



  render() {
    this.setLocalStorage();
    return (
      <div className="App">
        <header>
          <MainMenuIcon
            toggle={this.extendMainMenu.bind(this)}
          />

          <Searchbar />
        </header>

        <BrowseBox visible={this.state.view === "browse"} />

        <Topics
          visible={this.state.view === "topics"}
          changeView={this.changeView.bind(this)}
        />

        <Cards
          visible={this.state.view === "cards"}
          changeView={this.changeView.bind(this)}
          openCloseEditCards={this.openCloseEditCards.bind(this)} // edit cards can be opened from here as well
        />

        <EditCards
          visible={this.state.editCardVisible}
          openCloseEditCards={this.openCloseEditCards.bind(this)}
        />

        <MainMenu
          visible={this.state.isMainMenuVisible}
          toggle={this.closeMainMenu.bind(this)}
          changeView={this.changeView.bind(this)}
        />
      </div>
    ); // end of return
  } // end of render
} // end of App