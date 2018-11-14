import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import './ProjectCard.css';

export default class ProjectCard extends Component {

  state = {
    showResources: false,
    currentProject: this.props.project
  };

  render() {
    return (
      <div>
        <Card className='project-card'>
          <CardHeader
            title={this.props.project.name || this.props.project.name}
            subheader={this.props.project.registrationDate}
            className="project-card__title"
          />
          <div className="project-card__labels-container">
            <p className="project-card__labels">labels: {this.props.project.labels}</p>
          </div>
          <div className='actions'>
            <Button className="project-card__button" variant="contained"
                    onClick={() => this.props.viewResource(this.state.currentProject)}>Ver recurso</Button>
          </div>
        </Card>
      </div>
    );
  }
}
