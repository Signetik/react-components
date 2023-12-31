import Link from "next/link"

import { products } from "../../Products/Products"

//import "../../../styles/fonts.css"
import styles from "./Footer.module.css"

const FooterLinks = () => {
  return (
    <div className={styles["footerlinks"]}>
    <div className={styles["logo-img-wrapper"]}>
      <img src="/images/Signetik Logo_Color_HZ_Registered.png" className={styles["logo-img"]} alt="Signetik" />
      </div>
      <div className={styles["footerlinkscolumn"]}>
        <div className={styles["footerlinkheader"]}>Solutions</div>
        <div className={styles["footerlinkitem"]}>
          <Link
            href="/solutions/longrange"
            className={styles["footerlinkitem"]}
          >
            LoRa&trade;
          </Link>
        </div>
        <div className={styles["footerlinkitem"]}>
          <Link href="/solutions/ble" className={styles["footerlinkitem"]}>
            BLE
          </Link>
        </div>
        <div className={styles["footerlinkitem"]}>
          <Link href="/solutions/wifi" className={styles["footerlinkitem"]}>
            WiFi
          </Link>
        </div>
        <div className={styles["footerlinkitem"]}>
          <Link href="/solutions/location" className={styles["footerlinkitem"]}>
            Location
          </Link>
        </div>
      </div>
      <div className={styles["footerlinkscolumn"]}>
        <div className={styles["footerlinkheader"]}>Products</div>
        {products.map(product => (
          <div className={styles["footerlinkitem"]}>
            <Link
              href={"/product/" + product.title}
              className={styles["footerlinkitem"]}
            >
              {product.title}
            </Link>
          </div>
        ))}
      </div>
      <div className={styles["footerlinkscolumn"]}>
        <div className={styles["footerlinkheader"]}>Company</div>
        <div className={styles["footerlinkitem"]}>
          <Link href="/services" className={styles["footerlinkitem"]}>
            Services
          </Link>
        </div>
        <div className={styles["footerlinkitem"]}>
          <Link href="/about" className={styles["footerlinkitem"]}>
            About
          </Link>
        </div>
        <div className={styles["footerlinkitem"]}>
          <Link href="/legal" className={styles["footerlinkitem"]}>
            Legal
          </Link>
        </div>
      </div>
      <div className={styles["footerlinkscolumn"]} />
    </div>
  )
}

const Footer = () => (
  <div className={styles["footer"]}>
    <div className={styles["container"]}>
      <FooterLinks />
    </div>
    <div className={styles["footerinfo"]}>
      &copy; {new Date().getFullYear()} Signetik, LLC<br />
      All rights reserved.
    </div>
  </div>
)

export default Footer
