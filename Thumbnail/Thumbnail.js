import React from "react"

import "../../styles/fonts.css"
import "./Thumbnail.css"

class Thumbnail extends React.Component {
  render() {
    return (
      <div class="thumbnail">
        <div class="thumbnail-img">
          <img src={this.props.img} alt="" />
        </div>
        <div class="thumbnail-body">
          <div class="thumbnail-title">{this.props.title}</div>
          <div class="thumbnail-text">{this.props.text}</div>
          <div class="thumbnail-more">Read more>></div>
        </div>
      </div>
    )
  }
}

export default Thumbnail
