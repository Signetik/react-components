import React from "react"
//import { Link } from "gatsby"
import "./ProductBox.css"
import Link from "next/link"

const ProductBox = ({
  align,
  imageSrc,
  imageAlt,
  name,
  description,
  index,
  link,
}) => {
  return (
    <div className="productbox">
      {align !== "right" ? (
        <div className="productbox__img">
          <img src={imageSrc} alt={imageAlt} />
        </div>
      ) : (
        ""
      )}
      <div
        className={`productbox__text ${
          align !== "right"
            ? "productbox__text--right"
            : "productbox__text--left"
        }`}
      >
        <div>
          <h1>{index < 9 ? '0' : ''}{index + 1}</h1>
          <h2>{name}</h2>
          <div dangerouslySetInnerHTML={{
                    __html: description,
                    }} />
          <Link href={"" + link} className="btn btn--main">learn more</Link>
        </div>
      </div>
      {align === "right" ? (
        <div className="productbox__img">
          <img src={imageSrc} alt={imageAlt} />
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default ProductBox
