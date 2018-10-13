import React, {Component} from 'react';
import './Home.css'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import "./Options.css"
import TextField from '@material-ui/core/TextField';
import ProjectsAPI from '../api/ProjectsAPI'
import ResourcesAPI from '../api/ResourcesAPI'


class Home extends Component {

  state = {
    resourcesFound: [],
    projectsFound: []

  };

  searchLabel = async (value) => {
    await ProjectsAPI.getProjectsByLabel(value, (response) => {
      this.setState({
        projectsFound: response.data.objects
      })
    });
    await ResourcesAPI.getResourceByLabel(value, (response) => {
      this.setState({
        resourcesFound: response.data.objects
      })
    });
    this.props.showLabelSearch(this.state.resourcesFound, this.state.projectsFound);
  };

  render() {
    return (
      <Card className="home__options-card">
        {this.props.options.map((actual, i) => (
          <Button variant="outlined" className="home__button"
                  onClick={() =>this.props.showOption(actual)}>
            {actual}
          </Button>))}
        <TextField
          id="standard-with-placeholder"
          label="Buscar por etiqueta"
          placeholder="agil..."
          className="home__text-field"
          margin="normal"
          onChange={(event)=>this.searchLabel(event.target.value)}
        />
      </Card>);
  }
}

export default Home;