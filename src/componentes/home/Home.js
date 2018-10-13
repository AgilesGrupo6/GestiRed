import React, {Component} from 'react';
import './Home.css'
import Card from '@material-ui/core/Card';
import Options from "../home/Options";
import InformationPanel from "../home/InformationPanel";

class Home extends Component {

  state = {
    projects: null,
    seeProjects: true,
    seeResources: false,
    seeInfoResource: false,
    showMyProjects: false,
    resourcesByLabel: false,
    resourcesByTimeline: false,
    actualOption: "",
    currentProject: null,
    currentResource: null,
    labelProjects: [],
    labelResources: [],
    labelSearch: false,
    options: ["Todos los proyectos"]
  };

  viewProject = (project) => {
    console.log("entro a ver proyecto ohhh" + project.name)
    this.setState({
      seeProjects: false,
      seeResources: true,
      seeInfoResource: false,
      currentProject: project,
      labelSearch: false,
    })

  };

  viewResource = (resource) => {
    this.setState({
      seeInfoResource: true,
      currentResource: resource,
      seeProjects: false,
      seeResources: false,
      labelSearch: false,
    })
  };

  showLabelSearch = (resources, projects) => {
    this.setState({
      labelSearch: true,
      seeInfoResource: false,
      seeProjects: false,
      seeResources: false,
      labelProjects: projects,
      labelResources: resources,
    })
  };

  showOption = (option) => {
    console.log("aquiii que es option: ", option);
    if (option.toString() === "Todos los proyectos") {
      this.setState({
        seeProjects: true,
        showMyProjects: false,
        seeResources: false,
        resourcesByLabel: false,
        resourcesByTimeline: false,
      })
    }
    else if (option.toString() === "Mis proyectos") {
      this.setState({
        showMyProjects: true,
        seeProjects: false,
        seeResources: false,
        resourcesByLabel: false,
        resourcesByTimeline: false,
      })
    }
    else if (option.toString() === "Todos los recursos") {
      this.setState({
        seeResources: true,
        showMyProjects: false,
        seeProjects: false,
        resourcesByLabel: false,
        resourcesByTimeline: false,
      })
    }
    else if (option.toString() === "Recursos por etiquetas") {
      this.setState({
        resourcesByLabel: true,
        showMyProjects: false,
        seeProjects: false,
        seeResources: false,
        resourcesByTimeline: false,
      })
    }
    else if (option.toString() === "Recursos por linea de tiempo") {
      this.setState({
        resourcesByTimeline: true,
        showMyProjects: false,
        seeProjects: false,
        seeResources: false,
        resourcesByLabel: false,

      })
    }

  };


  render() {
    return (
      <div className="home">
        <div className="home__bar">
          <div className="home__bar-title">Gestired</div>
          <div className="home__data-container">
            <div className="home__bar-user-name">Orlando S.</div>
            <div className="home__menu-container">
              <img src="/images/menu-logo.png" className="home__menu"/>
            </div>
          </div>
        </div>
        <Options showOption={this.showOption} options={this.state.options} showLabelSearch={this.showLabelSearch}/>
        <Card className="home__information-card">
          <div className="home__navigation-info">
            {this.state.seeProjects ? "Proyectos" : (this.state.seeResources ? ("Recursos del proyecto "+ this.state.currentProject.name) :
              (this.state.seeInfoResource ? ("Recurso de "+ this.state.currentResource.nombre): "Resultado de la búsqueda"))}
          </div>
          {console.log("lalaal"+this.state.seeResources)}
          {this.state.seeProjects ? <InformationPanel content="projects" viewProject={this.viewProject}
                                                      currentProject={this.state.currentProject}
                                                      currentResource={this.state.currentResource}/>
            : (
              this.state.seeResources ? <InformationPanel content="resources" viewResource={this.viewResource}
                                                          currentProject={this.state.currentProject}
                                                          currentResource={this.state.currentResource}/>
                :
                (this.state.seeInfoResource ? <InformationPanel content="oneResource" viewResource={this.viewResource}
                                                                currentProject={this.state.currentProject}
                                                                currentResource={this.state.currentResource}/>
                    : <InformationPanel content="labels" viewResource={this.viewResource} viewProject={this.viewProject}
                                        currentProject={this.state.currentProject}
                                        currentResource={this.state.currentResource}
                                        labelResourcesFound={this.state.labelResources}
                                        labelProjectsFound={this.state.labelProjects}/>

                )
            )}
        </Card>
      </div>);

  }
}

export default Home;