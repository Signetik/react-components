import React from "react"

//import "../../../styles/fonts.css"
import styles from "./Footer.module.css"

const FooterLinks = () => (
  <div className={styles["footerlinks"]}>
  <div className={styles["footerlinkscolumn"]}>
    <div className={styles["footerlinkheader"]}>Solutions</div>
    <div className={styles["footerlinkitem"]}>Agriculture</div>
    <div className={styles["footerlinkitem"]}>Industrial Control</div>
    <div className={styles["footerlinkitem"]}>Smart Cities</div>
    <div className={styles["footerlinkitem"]}>Logistics</div>
    <div className={styles["footerlinkitem"]}>Healthcare</div>
    <div className={styles["footerlinkitem"]}>Buildings</div>
    <div className={styles["footerlinkitem"]}>Environment</div>
  </div>
  <div className={styles["footerlinkscolumn"]}>
    <div className={styles["footerlinkheader"]}>Solutions</div>
    <div className={styles["footerlinkitem"]}>Solutions</div>
  </div>
  <div className={styles["footerlinkscolumn"]}>
    <div className={styles["footerlinkheader"]}>Solutions</div>
    <div className={styles["footerlinkitem"]}>Solutions</div>
  </div>
  <div className={styles["footerlinkscolumn"]}>
    <div className={styles["footerlinkheader"]}>Solutions</div>
    <div className={styles["footerlinkitem"]}>Solutions</div>
  </div>
  <div className={styles["footerlinkscolumn"]}>
    <div className={styles["footerlinkheader"]}>Solutions</div>
    <div className={styles["footerlinkitem"]}>Solutions</div>
  </div>
  <div className={styles["footerlinkscolumn"]}>
    <div className={styles["footerlinkheader"]}>Solutions</div>
    <div className={styles["footerlinkitem"]}>Solutions</div>
  </div>
</div>
)

const Footer = () => (
  <div className={styles["footer"]}>
    <div className="container">
      {/*}<FooterLinks />{*/}
    </div>
    <div className={styles["footerinfo"]}>&copy; Signetik 2020-{new Date().getFullYear()}</div>
  </div>
)

export default Footer
