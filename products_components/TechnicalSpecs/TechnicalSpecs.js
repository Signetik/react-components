import React, { useState } from "react"
import "./TechnicalSpecs.css"

const TechnicalSpecs = ({ specsData }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isBuyLinks, setIsBuyLinks] = useState(false)

  return (
    <div className="container">
      <div
        className={`product-page__tech-specs ${
          isExpanded ? "isExpanded" : null
        }`}
      >
        <h3>More Information</h3>
        <div className="product-page__tech-specs__content">
          <div>
            <div className={"product-page__tech-specs__buttonbar"}>
              <div className={"debug"}>
                <a href={specsData.documentsLink} target="_blank" rel="noreferrer" className="btn btn--main">
                  Documentation
                </a>
                <a href={specsData.communityLink} target="_blank" rel="noreferrer" className="btn btn--main">
                  Community
                </a>
                <a href={specsData.supportLink} target="_blank" rel="noreferrer" className="btn btn--main">
                  Support
                </a>
                <a href="javascript:void(0)" className="btn btn--main btn--heavy" target="_blank" rel="noreferrer" onClick={() => setIsBuyLinks(!isBuyLinks)}>Buy Now</a>
                <div className={"product-page__buy-links"}>
                  <div className={"product-page__buy-links-sub"}>
                  {isBuyLinks && specsData.buyLink.map((item, index) => (
                    <a href={item.link} key={index} target="_blank" rel="noreferrer" className="btn btn--main btn--light">{item.mpn}</a>
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
