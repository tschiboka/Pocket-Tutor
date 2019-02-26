import React, { Component } from 'react';
import './App.css';
import Searchbar from "./Components/Searchbar/Searchbar";
import MainMenuIcon from './Components/MainMenuIcon/MainMenuIcon';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <MainMenuIcon />
          <Searchbar />
        </header>
      </div>
    );
  }
}