import React, {Component} from 'react';
import ProjectsAPI from '../api/ProjectsAPI';
import ProjectCard from "../projects/ProjectCard";
import "./Projects.css";

class Projects extends Component {

  state = {
    projects: []
  };

  componentDidMount() {
    ProjectsAPI.getAllProjects((response) => {
      this.setState({
        projects: response.data.objects
      });
    });
  }

  render() {
    return (
      <div className="projects">
        <div className="projects__title">Recursos</div>
        <div className="projects__container">
          {
            this.state.projects && this.state.projects.map((tile, i) => (
              <ProjectCard viewResource={this.props.viewResource} key={i} project={tile}/>
            ))
          }
        </div>
      </div>);
  }
}

export default Projects;