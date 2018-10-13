import React, {Component} from 'react';
import ProjectsAPI from '../api/ProjectsAPI'
import './Home.css'
import "./Options.css"
import ProjectCard from "../projects/ProjectCard";
import Timeline from "../resources/Timeline";
import ResourceCard from "../resources/ResourceCard";
import "./InformationPanel.css"


class InformationPanel extends Component {

  state = {
    projects: []
  };

  componentDidMount() {
    ProjectsAPI.getAllProjects((response) => {
      this.setState({
        projects: response.data.objects
      })
    });
  }

  updateInfo = (project) => {
    this.props.viewProject(project);

  };
  updateInfoResource = (resource) => {
    this.props.viewResource(resource);
  };

  render() {
    return (
      <div className="information-panel">

        {this.props.content === "projects" && this.state.projects != null ?
          this.state.projects.map((tile, i) => (
            <ProjectCard project={tile} viewProject={this.updateInfo}/>
          ))
          :
          (this.props.content === "resources" && this.state.projects != null && this.props.currentProject != null
              ?
              this.props.currentProject.resources.map((actual, i) => (
                <ResourceCard resource={actual} viewResource={this.updateInfoResource}/>
              ))
              :
              (this.props.content === "oneResource" ?
                  <Timeline resource={this.props.currentResource} resources={this.props.currentProject.resources}/>
                  :
                  <div className="information-panel__label-search">
                    {this.props.labelProjectsFound.map((tile, i) => (
                      <ProjectCard project={tile} viewProject={this.updateInfo}/>
                    ))}
                    {this.props.labelResourcesFound.map((actual, i) => (
                      <ResourceCard resource={actual} viewResource={this.updateInfoResource}/>
                    ))}
                  </div>
              )
          )
        }
      </div>);
  }
}

export default InformationPanel;