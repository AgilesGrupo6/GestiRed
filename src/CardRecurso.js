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
    if(this.props.recurso.resourceType.includes('nfo')){
      return '/info.png';
    }
    else if (this.props.recurso.resourceType.includes('WEB')){
      return '/web.png';      
    }
    else if (this.props.recurso.resourceType.includes('ideo')){
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
            title={this.props.recurso.name}
            subheader={this.props.recurso.registrationDate}
          />
          <CardMedia className='media'
            image={this.selectIcon()}
          />
          <CardContent>
            <p>{this.props.recurso.resourceType}</p>
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
              {'Participantes en: ' +this.props.recurso.name}
            </Typography>
            {this.props.recurso.responsibles.map(r => {
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

CardRecurso.propTypes = {
  recurso: PropTypes.shape({
    labels:PropTypes.string,
    registrationDate:PropTypes.string,
    id:PropTypes.number,
    name:PropTypes.string,
    resource_uri:PropTypes.string,
    responsibles:PropTypes.array,
    resourceType:PropTypes.string,
    url:PropTypes.string
  })
};