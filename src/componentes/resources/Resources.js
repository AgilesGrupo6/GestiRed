import React, {Component} from 'react';
import ResourceCard from "./ResourceCard";
import "./Resources.css";

class Resources extends Component {

  render() {
    return (
      <div className="resources">
        <div className="resources__title">{this.props.resourcesByQualityControl ? "Recursos para control de calidad"
          : (this.props.project ? this.props.project.name + " > " + "Artefactos" : "")}</div>
        <div>
          <div className="resources__container">
            {
              this.props.resources && this.props.resources.map((tile, i) => (
                <ResourceCard viewInfoResource={this.props.viewInfoResource} key={i}
                              resource={this.props.resourcesByQualityControl ? tile.resource : tile}/>
              ))
            }
          </div>
        </div>
      </div>);
  }
}

export default Resources;