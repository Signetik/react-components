import React from "react"

import "../../styles/fonts.css"
import "./Section.css"

class Section extends React.Component {
  render() {
    return (
      <div>
        <div className="section-header">
          <img src={this.props.img} alt="" />
          <div className="section-caption">{this.props.caption}</div>
        </div>
      </div>
    )
  }
}

export default Section
