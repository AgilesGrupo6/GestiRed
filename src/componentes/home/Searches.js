import React, {Component} from 'react';
import ProjectCard from "../projects/ProjectCard";
import ResourceCard from "../resources/ResourceCard";
import "./Searches.css";

class Searches extends Component {

  render() {
    return (
      <div className="searches">
        <div className="searches__title">Resultados de la búsqueda</div>
        <div className="searches__container">
          {
            this.props.projects && this.props.projects.map((tile, i) => (
              <ProjectCard viewResource={this.props.viewResource} key={i} project={tile}/>
            ))
          }
          {
            this.props.resources && this.props.resources.map((tile, i) => (
              <ResourceCard viewInfoResource={this.props.viewInfoResource} key={i} resource={tile}/>
            ))
          }
        </div>
      </div>);
  }
}

export default Searches;