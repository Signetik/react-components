import React from "react"
import styles from "./ProductHighlights.module.css"

const ProductHighlights = ({ highlights }) => {
  return (
    <section className={styles["product-highlights"]}>
      <div className={styles["container"]}>
        <div className={styles["product-highlights__row"]}>
          {highlights.cols.map((col, index) => (
            <div className={styles["product-highlights__col"]} key={index}>
              <h5>{col.title}</h5>
              <ul>
                {col.items.map((item, iIndex) => (
                  <li key={iIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles["product-highlights__additional"]}>
          <p>{highlights.additional}</p>
        </div>
      </div>
    </section>
  )
}

export default ProductHighlights
