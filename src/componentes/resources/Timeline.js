import React, { Component } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Work, School, Star} from '@material-ui/icons';
import ResourcesAPI from "../api/ResourcesAPI";
import "./Timeline.css";

class Timeline extends Component {

  state= {
    resources: this.props.resources,
    currentResource: this.props.resource,
    phases: null
  };
  componentDidMount() {
    ResourcesAPI.getResourceStages(this.state.currentResource.id, (response) => {
      this.setState({
        phases: response.data.objects
      })
    });
  }

  render() {
    return (
      <div style={{backgroundColor:'#cccccc'}} className="timeline">
        <h1>Timeline</h1>
        <VerticalTimeline>
          {this.state.phases? this.state.phases.map((actual,i)=>(
            <VerticalTimelineElement
              className="vertical-timeline-element--work"
              date="2011 - present"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<Work />}
            >
              <h2 className="vertical-timeline-element-title">{this.state.currentResource.nombre}</h2>
              <h3 className="vertical-timeline-element-title">{actual.tipoFase.nombre}</h3>
              {this.state.currentResource.responsables.map((act, j)=>(
                <h4 className="vertical-timeline-element-subtitle">Responsable {j+1+": "+act}</h4>
              ))}
              <p>
                Fecha inicial: {actual.fechaInicial}<br/>
                Fecha final: {actual.fechaFinal}<br/>
                Estado: completado
              </p>
            </VerticalTimelineElement>
          )):""}
        </VerticalTimeline>
      </div>
    );
  }
}
  
export default Timeline;