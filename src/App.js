import React, { Component } from 'react';
import './App.css';
import Timeline from './Timeline';
import CardRecurso from './CardRecurso';
import Proyecto from './Proyecto';

class App extends Component {
  constructor(props){
    super(props);

    this.state ={
      id:1
    };
  }

  render() {
    return (
      <div className="App">
        <h1>App</h1>
        <Proyecto id={this.state.id}/>
        <Timeline/>
      </div>
    );
  }
}

export default App;
