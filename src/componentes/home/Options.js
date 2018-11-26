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
import UsersAPI from '../api/UsersAPI';
import "./Options.css";


class Options extends Component {
  constructor(props){
    super(props);
    this.state = {
      resourcesFound: [],
      projectsFound: [],
      phases:[{id:1 , name:'PreProducción', checked:false},
        {id:2 , name:'Producción', checked:false},
        {id:3 , name:'PostProducción', checked:false},
        {id:4 , name:'Control de calidad', checked:false},
        {id:5 , name:'Sistematización y resguardo', checked:false}
      ],
      phasesFilter:[],
      resourcesFilter:[],
      usersOptions:[],
      usersFilter:[]
    };
    this.getUsers();
  }

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

  searchFilters = async (phases,resources,users) => {
    await ResourcesAPI.getResourceByFilter(phases,resources,users, (response) => {
      this.setState({
        resourcesFound: response.data.objects
      },() => {
        this.props.showLabelSearch(this.state.resourcesFound, this.state.projectsFound);
        console.log(response.data.objects);
      });
    });
    /* await ResourcesAPI.getProjectsByFilter(value, (response) => {
      this.setState({
        resourcesFound: response.data.objects
      });
    }); */
  };

  getUsers = async () => {
    await UsersAPI.getAllUsers((response) => {
      this.setState({
        usersOptions:response.data.objects
      });
    });
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
        if(element.checked){filters.push(element.id);}
      });
      this.setState({phasesFilter:filters},() => {
        const {phasesFilter,resourcesFilter,usersFilter} = this.state;
        this.searchFilters(phasesFilter.join(),resourcesFilter.join(),usersFilter.join());
      });
    });
  }

  handleResourceTypes = (e)  => {
    let types = [];
    e.forEach(item => types.push(item.value));
    this.setState({resourcesFilter:types},
      () => {
        const {phasesFilter,resourcesFilter,usersFilter} = this.state;
        this.searchFilters(phasesFilter.join(),resourcesFilter.join(),usersFilter.join());
      }
    );
  };

  handleUsersSelect = (e)  => {
    let users = [];
    console.log(e);
    e.forEach(item => users.push(item.value));
    this.setState({usersFilter:users},
      () => {
        const {phasesFilter,resourcesFilter,usersFilter} = this.state;
        this.searchFilters(phasesFilter.join(),resourcesFilter.join(),usersFilter.join());
      }
    );
  };

  renderFilters = () => {
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
      ],
      resourcesFilter:[],
      usersFilter:[]
    });
  };

  renderSelect = () => {
    const userOpt = () => {
      let opts=[];
      this.state.usersOptions.map( elem => {
        opts.push({value:elem.id, label:elem.name+' '+elem.surname});
      });
      return opts;
    };

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
          name="resourceTypes"
          options={options}
          className="home__options_select"
          classNamePrefix="select"
          placeholder='Tipo de recurso'
          onChange={e => this.handleResourceTypes(e)}
        />
        <h3>Usuario</h3>
        <Select
          defaultValue={[]}
          isMulti
          name="responsible"
          options={userOpt()}
          className="home__options_select"
          classNamePrefix="select"
          placeholder='Usuario'
          onChange={e => this.handleUsersSelect(e)}
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
            </div>
            :
            (actual.toString() === "Todos los recursos" &&
            <Button key={i} variant="outlined" className="home__button home__button-all-resources"
              onClick={() => {
                this.props.showOption(actual);
                this.clearFilters();
              }}>
              {actual}
            </Button>)
        ))}
        {this.renderFilters()}
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