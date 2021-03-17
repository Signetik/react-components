import React from "react"
import LogoImg from "../../../images/Signetik Logo_Color_HZ_Registered.png"

const Header = () => (
  <div className="banner">
    <img src={LogoImg} className="logo-img" alt="Signetik" />
    <div className="infobar">
      <div className="phone">402.421.2652</div>
      <div className="vertbar" />
      <div className="email">info@signetik.com</div>
    </div>
      <div className="bannerspace" />
  </div>
)

export default Header
