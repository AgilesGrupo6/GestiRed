import React, {Component} from 'react';
import ResourceCard from './ResourceCard';
import Grid from '@material-ui/core/Grid';

const urlBase = 'https://127.0.0.1:8000/';

class ResourcesGrid extends Component {

  render() {
    if (this.props.resources != null) {
      return (
        <Grid container className='root' spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              {this.props.resources.map(value => (
                <Grid key={value.id} item>
                  <ResourceCard recurso={value}/>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      );
    }
    else {
      return (<div/>);
    }
  }
}

export default ResourcesGrid;