import React, { useState } from "react"
import { Router, Link } from "react-router-dom";

const TopMenuItem = ({
  disabled,
  label,
  subMenu,
  children,
  onClick,
  indexTab,
  // just a default to prevent bugs
  linkTo,
  // linkTo = "/",
}) => {
  const [showMenu, setShowMenu] = useState(false)

  return subMenu ? (
    <div
      role="menubar"
      tabIndex={indexTab}
      className="menuitem"
      onMouseLeave={() => setShowMenu(false)}
    >
      <div
        role="menubar"
        tabIndex={indexTab}
        className={
          disabled ? "menuitem-head menuitem-head-disabled" : "menuitem-head"
        }
        onMouseEnter={() => setShowMenu(true)}
        onClick={disabled ? null : onClick}
        onKeyDown={ev => {
          if (ev.keyCode === 13 && !disabled) {
            onClick()
          }
        }}
      >
        {label}
      </div>
      <div
        className="menuitem-drop"
        style={{
          display: showMenu && subMenu ? "block" : "none",
        }}
      >
        <div className="menuitem-carat" />
        <div className="menuitem-sub">{children}</div>
      </div>
    </div>
  ) : (
    <div role="menubar" className="menuitem">
      <Link to={"" + linkTo} tabIndex={indexTab} role="menubar" className="menuitem-head">{label}</Link>
    </div>
  )
}

export const TopMenuSubItem = ({ linkTo, children }) => {
  return (
    <Link className="menuitem-subhead" to={linkTo}>
      {children}
    </Link>
  )
}

export default TopMenuItem
