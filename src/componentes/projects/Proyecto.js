import React, { Component } from 'react';
import ResourcesGrid from '../resources/ResourcesGrid';
import ProjectsAPI from '../api/ProjectsAPI'

const urlBase = 'http://127.0.0.1:8000/';

class Proyecto extends Component {
  constructor(props){
    super(props);

    this.state = {
      project:null
    };
  }


  componentDidMount(){
      ProjectsAPI.getAllProjects((response) => {
        this.setState({})
      });
  }
  
  render() {
    if(this.state.project!=null)
    {
      return (
        <div>
          {console.log("entro a que si existe proyecto")}
          <h1>Proyecto {this.state.project.id}</h1>
          <ResourcesGrid resources={this.state.project.resources}/>
        </div>
      );
    }
    else{
      return(<div>
        {console.log("entro a que NO existe proyecto")}
      </div>);
    }
  }
}

export default Proyecto;