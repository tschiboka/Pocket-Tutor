import React, { Component } from 'react';
import './App.css';
import Searchbar from "./Components/Searchbar/Searchbar";

export default class App extends Component {
  render() {
    return (
      <div className="App">
        <Searchbar />
      </div>
    );
  }
}