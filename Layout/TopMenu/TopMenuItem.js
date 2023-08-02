import React, { useState } from "react"
//import { Router, Link } from "react-router-dom";
import Link from "next/link"
import styles from "./TopMenuItem.module.css"

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
      className={styles["menuitem"]}
      onMouseLeave={() => setShowMenu(false)}
    >
      <div
        role="menubar"
        tabIndex={indexTab}
        className={
          disabled ? `${styles["menuitem-head"]} ${styles["menuitem-head-disabled"]}` : styles["menuitem-head"]
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
        className={styles["menuitem-drop"]}
        style={{
          display: showMenu && subMenu ? "block" : "none",
        }}
      >
        <div className={styles["menuitem-carat"]} />
        <div className={styles["menuitem-sub"]}>{children}</div>
      </div>
    </div>
  ) : (
    <div role="menubar" className={styles["menuitem"]}>
      <Link href={"" + linkTo} tabIndex={indexTab} role="menubar" className={styles["menuitem-head"]}>{label}</Link>
    </div>
  )
}

export const TopMenuSubItem = ({ linkTo, children }) => {
  return (
    <Link className={styles["menuitem-subhead"]} href={linkTo}>
      {children}
    </Link>
  )
}

export default TopMenuItem
