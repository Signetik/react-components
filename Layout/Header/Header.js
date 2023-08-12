import React, { Fragment } from "react"
//import LogoImg from "/images/Signetik Logo_Color_HZ_Registered.png"
import TopMenu from "../TopMenu/TopMenu"

import styles from "./Header.module.css"

const Header = () => (
  <div className={styles["banner"]}>
    <img src="/images/Signetik Logo_Color_HZ_Registered.png" className={styles["logo-img"]} alt="Signetik" />
    <div className={styles["rightside"]}>
    <div className={styles["infobar"]}>
      <div className={styles["phone"]}>402.421.2652</div>
      <div className={styles["vertbar"]} />
      <div className={styles["email"]}>info@signetik.com</div>
    </div>
    <TopMenu />
    </div>
      <div className={styles["bannerspace"]} />
  </div>
      )

export default Header
