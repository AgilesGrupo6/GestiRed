import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CardRecurso from './CardRecurso';
import Grid from '@material-ui/core/Grid';

class GridRecursos extends Component {
  constructor(props){
    super(props);

  }

  componentDidMount(){
    
  }

  render() {
    if(this.props.resources!=null)
    {
      return (
        <Grid container className='root' spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              {this.props.resources.map(value => (
                <Grid key={value.id} item>
                  <CardRecurso recurso={value}/>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      );
    }
    else{
      return(<div></div>);
    }
  }
}

GridRecursos.propTypes = {
  resources:PropTypes.array
};

export default GridRecursos;