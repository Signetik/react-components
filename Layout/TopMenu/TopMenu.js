import React from "react"
import styles from "./TopMenu.module.css"
import TopMenuItem, { TopMenuSubItem } from "./TopMenuItem"

import menudata from '../../../data/topmenu.json';

class TopMenu extends React.Component {
  constructor(props) {
    super(props)

    this.indexRef = React.createRef()
    this.state = { showHomeMenu: false, showSolutionsMenu: false }
  }

  render() {
    return (
      <div className={styles["navbar-wrapper"]}>
      <div className={styles["navbar"]} id="navbar">
      <div className={styles["menu"]}  id="menu">
        { menudata.map(item => (
          <TopMenuItem key={item.label} external={item.external ? true : false} label={item.label} indexTab={item.indexTab} linkTo={item.linkTo}>
            {item.label}
          </TopMenuItem>
        ))}
        {/*}
        <TopMenuItem label={"HOME"} indexTab={0} linkTo="/">
          HOME
        </TopMenuItem>
        <TopMenuItem
          label={"SOLUTIONS"}
          disabled={true}
          indexTab={1}
          subMenu={true}
          linkTo="/solutions"
        >
          <TopMenuSubItem linkTo="/solutions">solutions</TopMenuSubItem>
          <TopMenuSubItem linkTo="/solutions">xyz</TopMenuSubItem>
          <TopMenuSubItem linkTo="/solutions">xyz</TopMenuSubItem>
          <TopMenuSubItem linkTo="/solutions">xyz</TopMenuSubItem>
          <TopMenuSubItem linkTo="/solutions">xyz</TopMenuSubItem>
        </TopMenuItem>
        <TopMenuItem
          label={"PRODUCTS"}
          subMenu={false}
          onClick={this.props.onProducts}
          indexTab={2}
          linkTo="/products"
        >
          <TopMenuSubItem linkTo="/products">Products</TopMenuSubItem>
          <TopMenuSubItem linkTo="/products">SigCell</TopMenuSubItem>
          <TopMenuSubItem linkTo="/products">SigFi</TopMenuSubItem>
          <TopMenuSubItem linkTo="/products">SigLR</TopMenuSubItem>
          <TopMenuSubItem linkTo="/products">SigBLE</TopMenuSubItem>
          <TopMenuSubItem linkTo="/products">SigSense</TopMenuSubItem>
          <TopMenuSubItem linkTo="/products">SigGate</TopMenuSubItem>
          <TopMenuSubItem linkTo="/products">SigNet</TopMenuSubItem>
        </TopMenuItem>
        <TopMenuItem
          label={"SERVICES"}
          onClick={this.props.onServices}
          disabled={false}
          indexTab={3}
          subMenu={false}
          linkTo="/services"
        >
          <TopMenuSubItem linkTo="/services">services</TopMenuSubItem>
          <TopMenuSubItem linkTo="/services">xyz</TopMenuSubItem>
          <TopMenuSubItem linkTo="/services">xyz</TopMenuSubItem>
          <TopMenuSubItem linkTo="/services">xyz</TopMenuSubItem>
          <TopMenuSubItem linkTo="/services">xyz</TopMenuSubItem>
        </TopMenuItem>
        {/*}
        <TopMenuItem
          label={"TECHNOLOGIES"}
          onClick={this.props.onTechnologies}
          disabled={true}
          indexTab={4}
          subMenu={true}
          linkTo="/technologies"
        >
          <TopMenuSubItem linkTo="/technologies">technologies</TopMenuSubItem>
          <TopMenuSubItem linkTo="/technologies">xyz</TopMenuSubItem>
          <TopMenuSubItem linkTo="/technologies">xyz</TopMenuSubItem>
          <TopMenuSubItem linkTo="/technologies">xyz</TopMenuSubItem>
          <TopMenuSubItem linkTo="/technologies">xyz</TopMenuSubItem>
        </TopMenuItem>
        <TopMenuItem
          label={"ABOUT"}
          onClick={this.props.onAbout}
          subMenu={false}
          linkTo="/about"
        >
          <TopMenuSubItem linkTo="/about">about</TopMenuSubItem>
          <TopMenuSubItem linkTo="/about">xyz</TopMenuSubItem>
          <TopMenuSubItem linkTo="/about">xyz</TopMenuSubItem>
          <TopMenuSubItem linkTo="/about">xyz</TopMenuSubItem>
          <TopMenuSubItem linkTo="/about">xyz</TopMenuSubItem>
        </TopMenuItem>
          {*/}
      </div>
      </div>
      </div>
    )
  }
  /* https://www.w3schools.com/howto/howto_js_navbar_sticky.asp */
  componentDidMount() {
    console.log("Add listener for scroll")
    this.navbar = document.getElementById("navbar");
    console.log("sticky navbar: " + this.navbar)
    this.sticky = this.navbar.offsetTop;
    console.log("sticky navbar: " + this.navbar + "," + this.sticky.toString())
    window.addEventListener('scroll', (event) => {
      console.log("sticky: " + this.sticky.toString())

      if (window.pageYOffset >= this.sticky) {
        this.navbar.classList.add(styles["sticky"])
      } else {
        this.navbar.classList.remove(styles["sticky"]);
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}

export default TopMenu
