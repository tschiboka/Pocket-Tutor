import React, { Component } from 'react';
import './App.css';
import Searchbar from "./Components/Searchbar/Searchbar";
import MainMenu from './Components/MainMenu/MainMenu';

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <MainMenu />
          <Searchbar />
        </header>
      </div>
    );
  }
}