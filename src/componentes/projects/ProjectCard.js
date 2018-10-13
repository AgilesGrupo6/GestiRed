import React, { Component } from 'react';
import './ProjectCard.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';



export default class ProjectCard extends Component {
  constructor(props){
    super(props);

    // this.state = {
    //   icon:'/movies.ico'
    // };
    //
    // this.selectIcon = this.selectIcon.bind(this);
  }
  state = {
    showResources: false,
    id: this.props.project
  };
  // selectIcon(){
  //   if(this.props.recurso.tipoRecurso.includes('nfo')){
  //     return '/info.png';
  //   }
  //   else if (this.props.recurso.tipoRecurso.includes('WEB')){
  //     return '/web.png';
  //   }
  //   else if (this.props.recurso.tipoRecurso.includes('ideo')){
  //     return '/filevideo.png';
  //   }
  // }

  render() {
    return (
      <div>
        <Card className='card'>
          <CardHeader
            title={this.props.project.nombre || this.props.project.name}
            subheader={this.props.project.fechaRegistro}
            className="project-card__title"
          />
          {/*<CardMedia className='media'*/}
                     {/*image={this.selectIcon()}*/}
          {/*/>*/}
          <CardContent>
            <p>Etiquetas:</p>
            <p>{this.props.project.etiquetas}</p>
          </CardContent>
          <CardActions className='actions'>
            <Button  variant="outlined" onClick={(id)=>this.props.viewProject(this.state.id)}>Ver proyecto</Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
