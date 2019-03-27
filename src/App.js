import React, { Component } from 'react';
import './App.css';

import Searchbar from "./Components/Searchbar/Searchbar";
import MainMenuIcon from './Components/MainMenuIcon/MainMenuIcon';
import MainMenu from "./Components/MainMenu/MainMenu";
import BrowseBox from "./Components/BrowseBox/BrowseBox";
import Topics from "./Components/Topics/Topics";
import Cards from "./Components/Cards/Cards";
import EditCards from "./Components/EditCards/EditCards";
import Test from "./Components/Test/Test";


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      "isMainMenuVisible": false,  // main menu is invisible by default
      "view": "browse",            // default view is browse (user can read random cards)
      "editCardIsVisible": false,  // edit card will be able to be opened from multiple places
      "editCardId": null           // if id is not set it will be given a new id by EditCard (aka new Card)
    }; // end of state declaration
  } // end of constructor



  extendMainMenu() {
    const newState = this.state;

    newState.isMainMenuVisible = true;

    this.setState(newState);
  } // end of toggleMainMenu



  closeMainMenu(e) {
    const delay = setTimeout(() => {
      const newState = this.state;

      newState.isMainMenuVisible = false;

      this.setState(newState);
      clearTimeout(delay);
    }, 200);
  } // end of toggleMainMenu



  // CHANGE THE MAIN VIEW OF THE APP
  changeView(view) {
    const newState = this.state;

    newState.view = view;

    this.setState(newState);
  } // end of changeView



  // SET LOCALSORAGE, FIRST RUN IN THE BROWSER WOULD FAIL
  setLocalStorage() {
    // set default localstorage values in case missing or first visit
    if (!localStorage.cards) { localStorage.setItem("cards", "[]") }
    if (!localStorage.topics) { localStorage.setItem("topics", "[]") }
  } // end of setLocalStorage



  // edit cards can be opened form multiple places thoughout the app
  openCloseEditCards(isOpen, id) {
    console.log("OPEN", isOpen, id);
    const newState = this.state;

    newState.editCardIsVisible = isOpen;
    newState.editCardId = id;

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

        <BrowseBox
          visible={this.state.view === "browse"}
          openCloseEditCards={this.openCloseEditCards.bind(this)} // edit cards can be opened from here as well
        />

        <Topics
          visible={this.state.view === "topics"}
          changeView={this.changeView.bind(this)}
        />

        <Cards
          visible={this.state.view === "cards"}
          changeView={this.changeView.bind(this)}
          openCloseEditCards={this.openCloseEditCards.bind(this)} // edit cards can be opened from here as well
        />

        <Test
          visible={this.state.view === "test"}
          changeView={this.changeView.bind(this)}
        />

        { // EDIT CARDS
          this.state.editCardIsVisible &&
          <EditCards
            openCloseEditCards={this.openCloseEditCards.bind(this)}
            id={this.state.editCardId}
          />
        }

        <MainMenu
          visible={this.state.isMainMenuVisible}
          toggle={this.closeMainMenu.bind(this)}
          changeView={this.changeView.bind(this)}
          openCloseEditCards={this.openCloseEditCards.bind(this)} // when menu item clicked, edit card closes
        />
      </div>
    ); // end of return
  } // end of render
} // end of App