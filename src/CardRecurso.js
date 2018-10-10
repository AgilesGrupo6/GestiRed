import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CardRecurso.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';



export default class CardRecurso extends Component {
  constructor(props){
    super(props);

    this.state = {
      icon:'/movies.ico'
    };

    this.selectIcon = this.selectIcon.bind(this);
  }

  selectIcon(){
    if(this.props.recurso.tipoRecurso.includes('nfo')){
      return '/info.png';
    }
    else if (this.props.recurso.tipoRecurso.includes('WEB')){
      return '/web.png';      
    }
    else if (this.props.recurso.tipoRecurso.includes('ideo')){
      return '/filevideo.png';      
    }
    else{
      return 'resource.png';
    }
  }

  render() {
    return (
      <div>
        <Card className='card'>
          <CardHeader
            title={this.props.recurso.nombre}
            subheader={this.props.recurso.fechaRegistro}
          />
          <CardMedia className='media'
            image={this.selectIcon()}
          />
          <CardContent>
            <p>{this.props.recurso.tipoRecurso}</p>
          </CardContent>
          <CardActions className='actions'>
            <Button href={this.props.recurso.url}>Ver recurso</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
