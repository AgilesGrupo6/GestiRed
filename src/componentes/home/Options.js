import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import ProjectsAPI from '../api/ProjectsAPI';
import ResourcesAPI from '../api/ResourcesAPI';
import "./Options.css";


class Options extends Component {

  state = {
    resourcesFound: [],
    projectsFound: [],
    phases:[{id:1 , name:'PreProducción'},
      {id:2 , name:'Producción'},
      {id:3 , name:'PostProducción'},
      {id:4 , name:'Control de calidad'},
      {id:5 , name:'Sistematización y resguardo'}
    ],
    checkedItems: new Map()

  };

  searchLabel = async (value) => {
    await ProjectsAPI.getProjectsByLabel(value, (response) => {
      this.setState({
        projectsFound: response.data.objects
      });
    });
    await ResourcesAPI.getResourceByLabel(value, (response) => {
      this.setState({
        resourcesFound: response.data.objects
      });
    });
    this.props.showLabelSearch(this.state.resourcesFound, this.state.projectsFound);
  };

  searchFilters = async (value) => {
    await ProjectsAPI.getProjectsByFilter(value, (response) => {
      this.setState({
        projectsFound: response.data.objects
      },() => {
        this.props.showLabelSearch(this.state.resourcesFound, this.state.projectsFound);
      });
      console.log(response.data.objects);
    });
    /* await ResourcesAPI.getProjectsByFilter(value, (response) => {
      this.setState({
        resourcesFound: response.data.objects
      });
    }); */
  };

  handleCheckChange = (e) => {
    const item = e.target.value;
    const isChecked = e.target.checked;
    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(item, isChecked)
    }), () => {
      let filters=[];
      this.state.checkedItems.forEach((value,key) => {
        //console.log('Hola',key,value);
        if(value){filters.push(key);}
      });
      this.searchFilters(filters.join());
    });
  }

  renderFilters = () => {
    console.log('Mostar filtros');
    return (<FormControl component="fieldset" className={'formControl'}>
      <FormLabel component="legend">Fases</FormLabel>
      <FormGroup row>
        {this.state.phases.map(item => (
          <div key={item.id}> 
            <FormControlLabel
              control={
                <Checkbox onChange={this.handleCheckChange} checked={this.state.checkedItems.get(item.id)} value={item.id} />
              }
              label={item.name}
            /></div>
        ))}
      </FormGroup>
    </FormControl>);
  };

  render() {
    return (
      <Card className="home__options-card">
        {this.props.options.map((actual, i) => (
          this.props.fakeCurrentUser === "Lady Pinzón" && actual.toString() === "Recursos para control de calidad" ?
            <div>

              <Button key={i} variant="outlined" className="home__button"
                onClick={() => this.props.showOption(actual)}>
                {actual}
              </Button>
              {this.renderFilters()}
            </div>
            :
            (actual.toString() === "Todos los recursos" &&
              <Button key={i} variant="outlined" className="home__button"
                onClick={() => this.props.showOption(actual)}>
                {actual}
              </Button>)
        ))}
        <TextField
          id="standard-with-placeholder"
          label="Buscar por etiqueta"
          placeholder="agil..."
          className="home__text-field"
          margin="normal"
          onChange={(event) => this.searchLabel(event.target.value)}
        />
      </Card>);
  }
}

export default Options;