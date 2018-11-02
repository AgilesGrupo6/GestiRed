import React, {Component} from 'react';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Work} from '@material-ui/icons';
import ResourcesAPI from "../api/ResourcesAPI";
import UserAPI from "../api/UsersAPI";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import "./Timeline.css";

class Timeline extends Component {

  state = {
    resources: this.props.resources,
    currentResource: this.props.resource,
    phases: null,
    commentsDialog: false,
    responsibleDialog: false,
    endPhaseDialog: false,
    reviewDialog: false,
    usersWithRol: [],
    users: null
  };

  componentDidMount() {
    ResourcesAPI.getResourceStages(this.state.currentResource.id, (response) => {
      this.setState({
        phases: response.data.objects
      });
    });
    UserAPI.getAllUsers((response) => {
      this.setState({
          users: response.data.objects
        }, ()=>
        (
          this.state.users && this.state.users.map((actual, i) => (
            this.state.currentResource.responsibles.map((responsible, j) => (
              (actual.name + " " + actual.surname === responsible) &&
                this.state.usersWithRol.push(actual)
            ))
          ))));
    })
  }

    openReviewDialog = () => {
      this.setState({reviewDialog: true})
    };


    openResponsibleDialog = () => {
      this.setState({responsibleDialog: true})
    };

    openCommentsDialog = () => {
      this.setState({commentsDialog: true})
    };


    openEndPhaseDialog = () => {
      this.setState({endPhaseDialog: true})
    };

    handleCloseReviewDialog = () => {
      this.setState({reviewDialog: false});
    };

    handleCloseCommentsDialog = () => {
      this.setState({commentsDialog: false});
    };

    handleCloseResponsibleDialog = () => {
      this.setState({responsibleDialog: false});
    };

    handleCloseEndPhaseDialog = () => {
      this.setState({endPhaseDialog: false});
    };

    render()
    {
      return (
        <div style={{backgroundColor: '#cccccc'}} className="timeline">
          <h1>Timeline</h1>
          <VerticalTimeline>
            {this.state.phases ? this.state.phases.map((actual) => (
              <VerticalTimelineElement
                key={actual.id}
                className="vertical-timeline-element--work"
                iconStyle={{background: 'rgb(33, 150, 243)', color: '#fff'}}
                icon={<Work/>}
              >
                <h2 className="vertical-timeline-element-title">{this.state.currentResource.name}</h2>
                <h3 className="vertical-timeline-element-title">{actual.phaseType.name}</h3>
                <p>
                  Fecha inicial: {actual.initDate}<br/>
                  Fecha final: {actual.endDate}<br/>
                  Estado: completado
                </p>
                <Button variant="outlined" color="primary" className="timeline__responsible"
                        onClick={this.openResponsibleDialog}>
                  Responsables
                </Button>
                <br/>
                {actual.phaseType.name === 'Control de calidad' ?
                  <div>
                    <Button variant="outlined" color="primary" className="timeline__comments"
                            onClick={this.openCommentsDialog}>
                      Comentarios
                    </Button>
                    <br/>
                    <Button variant="outlined" color="secondary" className="timeline__review"
                            onClick={this.openReviewDialog}>
                      Solicitar revisión
                    </Button>
                    <br/>
                    <Button variant="outlined" disabled color="secondary" className="timeline__end-phase">
                      Terminar fase
                    </Button>
                  </div>
                  :
                  <Button variant="outlined" color="secondary" className="timeline__end-phase"
                          onClick={this.openEndPhaseDialog}>
                    Terminar fase
                  </Button>}

                <Dialog
                  open={this.state.reviewDialog}
                  onClose={this.handleCloseReviewDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  className="timeline__dialog"
                >
                  <DialogTitle id="alert-dialog-title">{"Enviar notificación de control de calidad"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Se enviara un correo a Mario Linares informando que ya puede hacer revisión de
                      este recurso. ¿Está seguro de solicitar control de calidad?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={this.handleCloseReviewDialog} color="primary">
                      Cancelar
                    </Button>
                    <Button onClick={this.handleCloseReviewDialog} color="primary" autoFocus>
                      Continuar
                    </Button>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={this.state.responsibleDialog}
                  onClose={this.handleCloseResponsibleDialog}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                  className="timeline__dialog"
                >
                  <DialogTitle id="alert-dialog-title">{"Responsables"}</DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      {this.state.usersWithRol.length===0? "":this.state.usersWithRol.map((act, j) => (
                        <h4 key={j}
                            className="vertical-timeline-element-subtitle">{act.name + " " + act.surname + ": " + act.rols.map((rol) =>
                            (" "+rol.name)
                          )}</h4>
                      ))}
                    </DialogContentText>
                  </DialogContent>
                  <DialogTitle id="alert-dialog-title">{"Asignar responsable de control de calidad"}</DialogTitle>
                  <DialogActions>
                    <Button onClick={this.handleCloseResponsibleDialog} color="primary" autoFocus>
                      Cancel
                    </Button>
                  </DialogActions>
                </Dialog>
              </VerticalTimelineElement>
            )) : ""}
          </VerticalTimeline>
        </div>
      );
    }
  }

  export
  default
  Timeline;