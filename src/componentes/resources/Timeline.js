import React, { Component } from 'react';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Work} from '@material-ui/icons';
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
      });
    });
  }

  render() {
    return (
      <div style={{backgroundColor:'#cccccc'}} className="timeline">
        <h1>Timeline</h1>
        <VerticalTimeline>
          {this.state.phases? this.state.phases.map((actual)=>(
            <VerticalTimelineElement
              key={actual.id}
              className="vertical-timeline-element--work"
              iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
              icon={<Work />}
            >
              <h2 className="vertical-timeline-element-title">{this.state.currentResource.name}</h2>
              <h3 className="vertical-timeline-element-title">{actual.phaseType.name}</h3>
              {this.state.currentResource.responsibles.map((act, j)=>(
                <h4 key={j} className="vertical-timeline-element-subtitle">Responsable {j+1+": "+act}</h4>
              ))}
              <p>
                Fecha inicial: {actual.initDate}<br/>
                Fecha final: {actual.endDate}<br/>
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