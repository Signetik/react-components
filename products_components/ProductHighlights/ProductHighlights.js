import React from "react"
import "./ProductHighlights.css"

const ProductHighlights = ({ highlights }) => {
  return (
    <section className="product-highlights">
      <div className="container">
        <div className="product-highlights__row">
          {highlights.cols.map((col, index) => (
            <div className="product-highlights__col" key={index}>
              <h5>{col.title}</h5>
              <ul>
                {col.items.map((item, iIndex) => (
                  <li key={iIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="product-highlights__additional">
          <p>{highlights.additional}</p>
        </div>
      </div>
    </section>
  )
}

export default ProductHighlights
