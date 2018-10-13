import React, { Component } from 'react';
import GridRecursos from './GridRecursos';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const urlBase = 'https://127.0.0.1:8000/';

class Proyecto extends Component {
  constructor(props){
    super(props);

    this.state = {
      projects:null,
      id:1
    };

    this.getProject = this.getProject.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({ [event.target.name]: event.target.value });
  }

  getProject(){
    fetch(urlBase+'gestired/project/')
      .then((res) => {
        return res.json();
      })
      .then((json) => this.setState({projects:json.objects}))
      .catch((err) => console.log(err));
  }

  componentDidUpdate(prevProps,prevState){
    if(this.state.id !== prevState.id){
      this.getProject();
    }
  }

  componentDidMount(){
    if(this.state.id!=0){
      this.getProject();
    }
  }
  
  render() {
    if(this.state.projects!=null)
    {
      return (
        <div>
          <FormControl className='formControl'>
            <InputLabel htmlFor="age-simple">Proyecto</InputLabel>
            <Select
              value={this.state.id}
              onChange={this.handleChange}
              inputProps={{
                name: 'id'
              }}
            >
              {this.state.projects.map(p => 
                <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>
              )}
            </Select>
          </FormControl>
          <h1>Proyecto {this.state.projects[this.state.id-1].name}</h1>
          <GridRecursos resources={this.state.projects[this.state.id-1].resources}/>
        </div>
      );
    }
    else{
      return(<div></div>);
    }
  }
}

export default Proyecto;