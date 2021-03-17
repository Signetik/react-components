import React from "react"

import "../../../styles/fonts.css"
import "./Footer.css"

const FooterLinks = () => (
  <div className="footerlinks">
  <div className="footerlinkscolumn">
    <div className="footerlinkheader">Solutions</div>
    <div className="footerlinkitem">Agriculture</div>
    <div className="footerlinkitem">Industrial Control</div>
    <div className="footerlinkitem">Smart Cities</div>
    <div className="footerlinkitem">Logistics</div>
    <div className="footerlinkitem">Healthcare</div>
    <div className="footerlinkitem">Buildings</div>
    <div className="footerlinkitem">Environment</div>
  </div>
  <div className="footerlinkscolumn">
    <div className="footerlinkheader">Solutions</div>
    <div className="footerlinkitem">Solutions</div>
  </div>
  <div className="footerlinkscolumn">
    <div className="footerlinkheader">Solutions</div>
    <div className="footerlinkitem">Solutions</div>
  </div>
  <div className="footerlinkscolumn">
    <div className="footerlinkheader">Solutions</div>
    <div className="footerlinkitem">Solutions</div>
  </div>
  <div className="footerlinkscolumn">
    <div className="footerlinkheader">Solutions</div>
    <div className="footerlinkitem">Solutions</div>
  </div>
  <div className="footerlinkscolumn">
    <div className="footerlinkheader">Solutions</div>
    <div className="footerlinkitem">Solutions</div>
  </div>
</div>
)

const Footer = () => (
  <div className="footer">
    <div className="container">
      {/*}<FooterLinks />{*/}
    </div>
    <div className="footerinfo">&copy; Signetik 2020-{new Date().getFullYear()}</div>
  </div>
)

export default Footer
