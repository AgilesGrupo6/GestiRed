import React, { Component } from 'react';
import './App.css';
import Timeline from './componentes/resources/Timeline';
import ResourceCard from './componentes/resources/ResourceCard';
import Proyecto from './componentes/projects/Proyecto';
import Home from './componentes/home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        {/*<h1>App</h1>*/}
        {/*<Proyecto id={1}/>*/}
        {/*<Timeline/>*/}
        <Home/>
      </div>
    );
  }
}

export default App;
