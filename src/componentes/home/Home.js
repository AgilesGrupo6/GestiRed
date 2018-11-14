import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import Options from "../home/Options";
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import QualityControlAPI from "../api/QualityControlAPI";
import Projects from "../projects/Projects";
import Resources from "../resources/Resources";
import Timeline from "../resources/Timeline";
import Searches from "./Searches";
import './Home.css';

class Home extends Component {

  state = {
    fakeCurrentUser: "Lady Pinzón",
    projects: null,
    seeProjects: true,
    seeResources: false,
    seeInfoResource: false,
    seeSearches: false,
    resourcesByQualityControl: false,
    currentProject: null,
    currentResource: null,
    labelProjects: [],
    labelResources: [],
    labelSearch: false,
    qualityControlResources: [],
    drawerRight: false,
    options: ["Todos los recursos", "Recursos para control de calidad"]
  };

  viewProject = (project) => {
    console.log("entro a ver proyecto ohhh" + project.name);
    this.setState({
      seeProjects: false,
      seeResources: true,
      seeInfoResource: false,
      currentProject: project,
      labelSearch: false,
    });

  };

  showLabelSearch = (resources, projects) => {
    this.setState({
      seeSearches: true,
      seeInfoResource: false,
      seeProjects: false,
      seeResources: false,
      labelProjects: projects,
      labelResources: resources,
    });
  };

  showOption = (option) => {

    if (option.toString() === "Todos los recursos") {
      this.setState({
        seeProjects: true,
        seeResources: false,
        seeInfoResource: false,
        resourcesByQualityControl: false,
      });
    }
    else if (option.toString() === "Recursos para control de calidad") {
      console.log("entre a recursos control de calidad");
      this.setState({
        seeResources: true,
        resourcesByQualityControl: true,
        seeProjects: false,
        seeInfoResource: false
      }, () => {
        QualityControlAPI.getQualityControlByPerson(2, (response) => {
          console.log("recibi respuesta" + response.data.objects);
          this.setState({
            qualityControlResources: response.data.objects,
          })
        })
      });
    }

  };

  viewResource = (project) => {
    this.setState({
      currentProject: project,
      seeResources: true,
      seeProjects: false
    })
  };
  viewInfoResource = (resource) => {
    this.setState({
      currentResource: resource,
      seeResources: false,
      seeInfoResource: true
    })
  };

  changeProfile = () => {
    this.setState({
      fakeCurrentUser: this.state.fakeCurrentUser === 'Lady Pinzón' ? 'Orlando Sabogal' : 'Lady Pinzón'
    });
  };

  toggleDrawer = (side, open) => {
    this.setState({
      [side]: open
    });
  };

  render() {
    return (
      <div className="home">
        <div className="home__bar">
          <div className="home__bar-title">Gestired</div>
          <div className="home__data-container">
            <div className="home__bar-user-name">{this.state.fakeCurrentUser}</div>
            <div className="home__menu-container">
              <img src="/images/menu-logo.png" className="home__menu"
                   onClick={() => this.toggleDrawer('drawerRight', true)}/>
            </div>
          </div>
        </div>
        <Options showOption={this.showOption} options={this.state.options} showLabelSearch={this.showLabelSearch}
                 fakeCurrentUser={this.state.fakeCurrentUser}/>
        <Card className="home__information-card">
          {
            this.state.seeProjects ?
              <Projects viewResource={this.viewResource}/> :
              (this.state.seeResources ?
                <Resources viewInfoResource={this.viewInfoResource} project={this.state.currentProject}
                           resources={this.state.resourcesByQualityControl ? this.state.qualityControlResources : this.state.currentProject.resources}
                           resourcesByQualityControl={this.state.resourcesByQualityControl}
                /> :
                (this.state.seeInfoResource ?
                  <Timeline
                    resources={this.state.resourcesByQualityControl ? this.state.qualityControlResources : this.state.currentProject.resources}
                    resource={this.state.currentResource}
                    fakeCurrentUser={this.state.fakeCurrentUser}/> :
                  (this.state.seeSearches ?
                    <Searches resources={this.state.labelResources} projects={this.state.labelProjects}
                              viewResource={this.viewResource} viewInfoResource={this.viewInfoResource}/> : "")))
          }
        </Card>
        <Drawer anchor="right" open={this.state.drawerRight} onClose={() => this.toggleDrawer('drawerRight', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={() => this.toggleDrawer('drawerRight', false)}
            onKeyDown={() => this.toggleDrawer('drawerRight', false)}
            className="home__change-profile"
          >
            <Button variant="outlined" className="home_button-change-profile" onClick={this.changeProfile}>
              Cambiar Perfil
            </Button>
          </div>
        </Drawer>
      </div>);

  }
}

export default Home;