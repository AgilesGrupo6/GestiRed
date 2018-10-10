import React, { Component } from 'react';
import './App.css';
import Timeline from './Timeline';
import Proyecto from './Proyecto';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>GestiRED</h1>
        <Proyecto/>
        <Timeline/>
      </div>
    );
  }
}

export default App;
