import React, {Component} from 'react';
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Work} from '@material-ui/icons';
import ResourcesAPI from "../api/ResourcesAPI";
import UserAPI from "../api/UsersAPI";
import QualityControlAPI from "../api/QualityControlAPI";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
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
    responsible: "",
    responsibleByResource: [],
    qualityControl: [],
    disableButton: false,
    idQualityControl: 1,
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
      }, () =>
        (
          this.state.users && this.state.users.map((actual, i) => (
            this.state.currentResource.responsibles.map((responsible, j) => (
              (actual.name + " " + actual.surname === responsible) &&
              this.state.usersWithRol.push(actual)
            ))
          ))));
    });
    QualityControlAPI.getQualityControl((response) => {
      this.setState({
        qualityControl: response.data.objects,
      }, () => (
        this.state.qualityControl && this.state.qualityControl.map((actual) => {
          if (this.state.currentResource.id === actual.resource.id) {
            this.state.responsibleByResource.push(actual.responsible.name + " " + actual.responsible.surname)
          }
        })
      ))
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
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

  saveQualityResponsible = () => {

    const userId = this.state.users.find(user => user.name === this.state.responsible).id;

    UserAPI.saveQualityResponsible({
      resource: "/gestired/resource/" + this.state.currentResource.id + "/",
      responsible: "/gestired/user/" + userId + "/",
      createUser: "/gestired/user/" + "1/"
    });

    this.handleCloseResponsibleDialog();
    this.setState({responsibleByResource: [], qualityControl: []}, () => (
      QualityControlAPI.getQualityControl((response) => {
        this.setState({
          qualityControl: response.data.objects,
        }, () => (
          this.state.qualityControl && this.state.qualityControl.map((actual) => {
            if (this.state.currentResource.id === actual.resource.id) {
              this.state.responsibleByResource.push(actual.responsible.name + " " + actual.responsible.surname);
            }
          })
        ))
      })
    ));
  };

  sendNotification = () => {
    const qualityId = this.state.qualityControl.find(q => q.responsible.name + " " + q.responsible.surname
      === this.state.responsibleByResource[0]).id;

    QualityControlAPI.sendNotification(
      {
        qualityControl_id: qualityId,
        resource_name: this.state.currentResource.name,
        responsible_name: this.state.responsibleByResource[0]
      }
    );
    this.handleCloseReviewDialog();
    this.setState({
      disableButton: true,
    })
  };

  render() {
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
                  {this.state.disableButton
                    ?
                    <Tooltip title="Ya enviaste notificación de control de calidad">
                      <span>
                      <Button variant="outlined" color="secondary" disabled className="timeline__review-disabled-button"
                              onClick={this.openReviewDialog}>
                        Solicitar revisión
                      </Button>
                      </span>
                    </Tooltip>
                    :
                    <Button variant="outlined" color="secondary" className="timeline__review"
                            onClick={this.openReviewDialog}>
                      Solicitar revisión
                    </Button>
                  }

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
                    Se enviara un correo a {this.state.responsibleByResource[0]} informando que ya puede hacer revisión
                    de
                    este recurso. ¿Está seguro de solicitar control de calidad?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseReviewDialog} color="primary">
                    Cancelar
                  </Button>
                  <Button onClick={this.sendNotification} color="primary" autoFocus>
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
                    {this.state.usersWithRol.length === 0 ? "" : this.state.usersWithRol.map((act, j) => (
                      <h4 key={j}>
                        {act.name + " " + act.surname + ": " + act.rols.map((rol) =>
                          (" " + rol.name)
                        )}</h4>
                    ))}
                    {
                      this.state.responsibleByResource.length === 0 ? "" : this.state.responsibleByResource.map((actual, i) => (
                        <h4 key={i}>
                          {actual + ": Control de calidad"}
                        </h4>
                      ))
                    }

                  </DialogContentText>
                </DialogContent>
                <DialogTitle id="alert-dialog-title">{"Asignar responsable de control de calidad"}</DialogTitle>
                <DialogContent>
                  <TextField
                    id="standard-select-currency"
                    select
                    label="Selección"
                    className="timeline__add-responsible"
                    value={this.state.responsible}
                    onChange={this.handleChange('responsible')}
                    SelectProps={{
                      MenuProps: {
                        className: "timeline__menu",
                      },
                    }}
                    helperText="Selecciona una persona"
                    margin="normal"
                  >
                    {this.state.users && this.state.users.map(option => (
                      <MenuItem key={option.name} value={option.name}>
                        {option.name + " " + option.surname}
                      </MenuItem>
                    ))}
                  </TextField>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseResponsibleDialog} color="primary">
                    Cancelar
                  </Button>
                  <Button onClick={this.saveQualityResponsible} color="primary" autoFocus>
                    Continuar
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

export default Timeline;