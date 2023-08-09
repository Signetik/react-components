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
  return (
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
}

const Footer = () => (
  <div className={styles["footer"]}>
    <div className={styles["container"]}>
      <FooterLinks />
    </div>
    <div className={styles["footerinfo"]}>
      &copy; Signetik 2020-{new Date().getFullYear()}
    </div>
  </div>
)

export default Footer
