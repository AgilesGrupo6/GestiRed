import React, { Component } from 'react';
import './ResourceCard.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

export default class ResourceCard extends Component {
  selectIcon =()=>{
    if(this.props.resource!=null &&this.props.resource.tipoRecurso!=null) {
      if (this.props.resource.tipoRecurso.includes('nfo')) {
        return '/info.png';
      }
      else if (this.props.resource.tipoRecurso.includes('WEB')) {
        return '/web.png';
      }
      else if (this.props.resource.tipoRecurso.includes('ideo')) {
        return '/filevideo.png';
      }
      else {
        return '/any.png';
      }
    } else {
      return '/any.png';
    }
  };

  render() {
    return (
      <div>
        <Card className='card'>
          <CardHeader
            title={this.props.resource.nombre || this.props.resource.name}
            subheader={this.props.resource.fechaRegistro}
            className="resource-card__title"
          />
          <img src={this.selectIcon()} className="resource-card__image"
          />
            <p>{this.props.resource.tipoRecurso}</p>

          <CardActions className='actions'>
            <Button  variant="outlined" onClick={(resource)=>this.props.viewResource(this.props.resource)} >Ver recurso</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
