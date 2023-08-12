import React from "react"
import { Slide } from "react-slideshow-image"

import 'react-slideshow-image/dist/styles.css'

import styles from "./Showcase.module.css"

import AgImg from "../../public/images/Agriculture.png"
import BuildImg from "../../public/images/Buildings.png"
import EnvImg from "../../public/images/Environment.png"
import HealthImg from "../../public/images/Healthcare.png"
import IndImg from "../../public/images/Industrial Control.png"
import LogImg from "../../public/images/Logistics.png"
import CityImg from "../../public/images/Smart Cities.png"

const slideImages = ["/images/Agriculture.png", "/images/Industrial Control.png", "/images/Healthcare.png", "/images/Buildings.png", "/images/Environment.png", "/images/Logistics.png", "/images/Smart Cities.png"]

const slideCaptions = ["AGRICULTURE", "INDUSTRIAL", "HEALTHCARE", "BUILDINGS", "ENVIRONMENT", "LOGISTICS", "SMART CITIES"]

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
      <div className={styles["slide-container"]}>
        <Slide
          duration={5000}
          transitionDuration={500}
          infinite={true}
          indicators={true}
          arrows={true}
          pauseOnHover={false}
          onChange={this.onChange}
        >
          <div className={styles["each-slide"]}>
            <img src={slideImages[0]} alt={slideCaptions[0]} />
          </div>
          <div className={styles["each-slide"]}>
            <img src={slideImages[1]} alt={slideCaptions[1]} />
          </div>
          <div className={styles["each-slide"]}>
            <img src={slideImages[2]} alt={slideCaptions[2]} />
          </div>
          <div className={styles["each-slide"]}>
            <img src={slideImages[3]} alt={slideCaptions[3]} />
          </div>
          <div className={styles["each-slide"]}>
            <img src={slideImages[4]} alt={slideCaptions[4]} />
          </div>
          <div className={styles["each-slide"]}>
            <img src={slideImages[5]} alt={slideCaptions[5]} />
          </div>
          <div className={styles["each-slide"]}>
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
    this.state = { image: "/images/Agriculture.png" }
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
      <div className={styles["showcase"]}>
        <Slideshow setCaption={this.setCaption} />
        <div className={styles["backtext"]}>
          <div className={styles["backtext1"]}>TECHNOLOGY FOR</div>
          <div className={this.state.fade ? styles["backtext2out"] : styles["backtext2in"]}>
            {this.state.imageCaption}
          </div>
        </div>
      </div>
    )
  }
}

export default Showcase
