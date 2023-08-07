import React, { useState } from "react"
import styles from "./TechnicalSpecs.module.css"

const TechnicalSpecs = ({ specsData }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isBuyLinks, setIsBuyLinks] = useState(false)
  const [distIndex, setDistIndex] = useState(-1)

  return (
    <div className="container">
      <div
        className={`${styles["product-page__tech-specs"]} ${
          isExpanded ? styles["isExpanded"] : null
        }`}
      >
        <h3>More Information</h3>
        <div className={styles["product-page__tech-specs__content"]}>
          <div>
            <div className={styles["product-page__tech-specs__buttonbar"]}>
              <div className={styles["debug"]}>
                <a href={specsData.documentsLink} target="_blank" rel="noreferrer" className="btn btn--main">
                  Documentation
                </a>
                <a href={specsData.communityLink} target="_blank" rel="noreferrer" className="btn btn--main">
                  Community
                </a>
                <a href={specsData.supportLink} target="_blank" rel="noreferrer" className="btn btn--main">
                  Support
                </a>
                <a href="javascript:void(0)" className="btn btn--main btn--heavy" rel="noreferrer" onClick={() => setIsBuyLinks(!isBuyLinks)}>Buy Now</a>
                <div className={styles["product-page__buy-links"]}>
                  <div className={styles["product-page__buy-links-sub"]}>
                  {isBuyLinks && specsData.buyLink.map((item, index) => (
                    <a href="javascript:void(0)" key={index} rel="noreferrer" className={`btn btn--main btn--light ${distIndex === index ? 'product-page__select' : 'product-page__normal'}`} onClick={() => setDistIndex(index)}>{item.mpn}</a>
                  ))}
                  </div>
                  <div className={styles["product-page__buy-links-sub"]}>
                  {distIndex >= 0 && isBuyLinks && specsData.buyLink[distIndex].link.map((item, index) => (
                    <a href={item.link} key={index} rel="noreferrer" className="btn btn--main btn--light">{item.dist}</a>
                  ))}

                  </div>
                </div>
              </div>
            </div>
          </div>

          <ul>
            {specsData.info && specsData.info[0].length > 0 && specsData.info.map((spec, index) => (
              <li key={index}>{spec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default TechnicalSpecs
