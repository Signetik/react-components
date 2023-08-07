import React from "react"

//import "../../styles/fonts.css"
import styles from "./Section.module.css"

class Section extends React.Component {
  render() {
    return (
      <div>
        <div className={styles["section-header"]}>
          <img src={this.props.img} alt="" />
          <div className={styles["section-caption"]}>{this.props.caption}</div>
        </div>
        <div>{this.props.children}</div>

      </div>
    )
  }
}

export default Section
