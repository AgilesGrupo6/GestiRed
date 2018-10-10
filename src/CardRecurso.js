import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CardRecurso.css';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import PeopleIcon from '@material-ui/icons/People';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
  },
});

export default class CardRecurso extends Component {
  constructor(props){
    super(props);

    this.state = {
      icon:'/movies.ico',
      open:false
    };

    this.selectIcon = this.selectIcon.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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

  handleOpen(){
    this.setState({ open: true });
  }

  handleClose(){
    this.setState({ open: false });
  }

  getModalStyle() {
    const top = 50 + Math.round(Math.random() * 20) - 10;
    const left = 50 + Math.round(Math.random() * 20) - 10;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
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
            <IconButton
              onClick={this.handleOpen}
              aria-label="Ver participantes"
            >
              <PeopleIcon />
            </IconButton>
            <Button href={this.props.recurso.url}>Ver recurso</Button>
          </CardActions>
        </Card>
        <Modal
          aria-labelledby='simple-modal-title'
          aria-describedby="simple-modal-description"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <div style={this.getModalStyle()} className='paper'>
            <Typography variant="headline" id="modal-title">
              {'Participantes en: ' +this.props.recurso.nombre}
            </Typography>
            {this.props.recurso.responsables.map(r => {
              return (<Typography key={r} variant="subheading" id="simple-modal-description">
                {r}
              </Typography>);
            })}
          </div>
        </Modal>
      </div>
    );
  }
}
