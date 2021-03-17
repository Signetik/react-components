import React from "react"
import { Slide } from "react-slideshow-image"

import 'react-slideshow-image/dist/styles.css'

import "../../styles/fonts.css"
import "./Showcase.css"

import AgImg from "../../images/Agriculture.png"
import BuildImg from "../../images/Buildings.png"
import EnvImg from "../../images/Environment.png"
import HealthImg from "../../images/Healthcare.png"
import IndImg from "../../images/Industrial Control.png"
import LogImg from "../../images/Logistics.png"
import CityImg from "../../images/Smart Cities.png"

const slideImages = [AgImg, IndImg, HealthImg, BuildImg, EnvImg, LogImg, CityImg]

const slideCaptions = ["AGRICULTURE", "INDUSTRIAL", "HEALTHCARE", "BUILDINGS", "ENVIRONMENTAL", "LOGISTICS", "SMART CITIES"]

class Slideshow extends React.Component {
  constructor(props) {
    super(props)

    this.indexRef = React.createRef()
    this.onChange = this.onChange.bind(this)
  }

  onChange(oldIndex, newIndex) {
    console.log(`slide transition from ${oldIndex} to ${newIndex}`)
    this.props.setCaption(slideCaptions[newIndex])
  }

  render() {
    return (
      <div className="slide-container">
        <Slide
          duration={5000}
          transitionDuration={500}
          infinite={true}
          indicators={true}
          arrows={true}
          pauseOnHover={false}
          onChange={this.onChange}
        >
          <div className="each-slide">
            <img src={slideImages[0]} alt={slideCaptions[0]} />
          </div>
          <div className="each-slide">
            <img src={slideImages[1]} alt={slideCaptions[1]} />
          </div>
          <div className="each-slide">
            <img src={slideImages[2]} alt={slideCaptions[2]} />
          </div>
          <div className="each-slide">
            <img src={slideImages[3]} alt={slideCaptions[3]} />
          </div>
          <div className="each-slide">
            <img src={slideImages[4]} alt={slideCaptions[4]} />
          </div>
          <div className="each-slide">
            <img src={slideImages[5]} alt={slideCaptions[5]} />
          </div>
          <div className="each-slide">
            <img src={slideImages[6]} alt={slideCaptions[6]} />
          </div>
        </Slide>
      </div>
    )
  }
}

class Showcase extends React.Component {
  constructor(props) {
    super(props)

    this.indexRef = React.createRef()
    this.state = { image: AgImg }
    this.setCaption = this.setCaption.bind(this)
    this.state = { imageCaption: "AGRICULTURE", fade: false }
  }

  setCaption(caption) {
    this.setState({ fade: true })
    setTimeout(() => {
      this.setState({ imageCaption: caption })
      this.setState({ fade: false })
    }, 1000)
  }

  render() {
    return (
      <div className="showcase">
        <Slideshow setCaption={this.setCaption} />
        <div className="backtext">
          <div className="backtext1">CONNECTING TECHNOLOGY WITH</div>
          <div className={this.state.fade ? "backtext2out" : "backtext2in"}>
            {this.state.imageCaption}
          </div>
        </div>
      </div>
    )
  }
}

export default Showcase
