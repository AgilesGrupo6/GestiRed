import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Select from 'react-select';
import ProjectsAPI from '../api/ProjectsAPI';
import ResourcesAPI from '../api/ResourcesAPI';
import "./Options.css";


class Options extends Component {

  state = {
    resourcesFound: [],
    projectsFound: [],
    phases:[{id:1 , name:'PreProducción', checked:false},
      {id:2 , name:'Producción', checked:false},
      {id:3 , name:'PostProducción', checked:false},
      {id:4 , name:'Control de calidad', checked:false},
      {id:5 , name:'Sistematización y resguardo', checked:false}
    ],
    phasesFilter:[],
    resourcesTypes:[]
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

  searchFilters = async (phases,resourcesTypes) => {
    await ResourcesAPI.getResourceByFilter(phases,resourcesTypes, (response) => {
      this.setState({
        resourcesFound: response.data.objects
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
    console.log(item,isChecked);
    let prev = this.state.phases;
    prev[item-1].checked = isChecked;
    this.setState({
      phases: prev
    }, () => {
      let filters=[];
      this.state.phases.forEach((element) => {
        //console.log('Hola',element);
        if(element.checked){filters.push(element.id);}
      });
      this.setState({phasesFilter:filters},() => {
        if (filters.length>0) {this.searchFilters(this.state.phasesFilter.join(),this.state.resourcesTypes.join());}
      });
      //console.log(filters);
    });
  }

  handleResourceTypes = (e)  => {
    let types = [];
    e.forEach(item => types.push(item.value));
    this.setState({resourcesTypes:types},
      () => {
        this.searchFilters(this.state.phasesFilter.join(),this.state.resourcesTypes.join())
      }
    );
  };

  renderFilters = () => {
    console.log('Mostar filtros');
    return (<FormControl component="fieldset" className={'formControl'}>
      <FormLabel component="legend">Fases</FormLabel>
      <FormGroup>
        {this.state.phases.map(item => (
          <div key={item.id}> 
            <FormControlLabel
              control={
                <Checkbox onChange={this.handleCheckChange} checked={item.checked} value={item.id} />
              }
              label={item.name}
            /></div>
        ))}
      </FormGroup>
    </FormControl>);
  };

  clearFilters = () => {
    console.log('Limpiando');
    this.setState({
      phases: [{id:1 , name:'PreProducción', checked:false},
        {id:2 , name:'Producción', checked:false},
        {id:3 , name:'PostProducción', checked:false},
        {id:4 , name:'Control de calidad', checked:false},
        {id:5 , name:'Sistematización y resguardo', checked:false}
      ]
    });
  };

  renderSelect = () => {
    const options = [
      { value: 1, label: 'Video' },
      { value: 3, label: 'Infografia' },
      { value: 5, label: 'Icono' },
      { value: 6, label: 'Banner' },
      { value: 7, label: 'Dibujo' },
      { value: 8, label: 'Diseño interactivo' },
      { value: 6, label: 'Banner' },
    ];

    return (
      <div>
        <h3>Tipo de Recurso</h3>
        <Select
          defaultValue={[]}
          isMulti
          name="colors"
          options={options}
          className="home__options_select"
          classNamePrefix="select"
          onChange={e => this.handleResourceTypes(e)}
        />
      </div>
    );
  };

  render() {
    return (
      <Card className="home__options-card">
        {this.props.options.map((actual, i) => (
          this.props.fakeCurrentUser === "Lady Pinzón" && actual.toString() === "Recursos para control de calidad" ?
            <div>

              <Button key={i} variant="outlined" className="home__button"
                onClick={() => {
                  this.props.showOption(actual);
                  this.clearFilters();  
                }}>
                {actual}
              </Button>
              {this.renderFilters()}
            </div>
            :
            (actual.toString() === "Todos los recursos" &&
            <Button key={i} variant="outlined" className="home__button"
              onClick={() => {
                this.props.showOption(actual);
                this.clearFilters();
              }}>
              {actual}
            </Button>)
        ))}
        {this.renderSelect()}
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