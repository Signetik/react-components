import React from "react"
import "../../styles/fonts.css"
import "./Recent.css"

// import Thumbnail from "../Thumbnail/Thumbnail"

import { productsPlaceholders } from "../../placeholder_data/products"
import ProductBox from "../products_components/ProductBox/ProductBox"

export const Recent = () => (
  <section className="recentProducts">
    <div className="container">
      <h2 className="recent-title">Recent Additions</h2>
      {productsPlaceholders.map((product, i) => (
        <ProductBox
          key={i}
          align={i % 2 !== 0 ? "right" : ""}
          imageSrc={product.imageSrc}
          imageAlt={product.imageAlt}
          index={i}
          name={product.name}
          description={product.description}
        />
      ))}
      {/*
    <div className="recent">
      <div
        style={{ display: "flex", alignItems: "top", justifyContent: "center" }}
      >
        <Thumbnail
          img={frontPageItem[0][0]}
          title={frontPageItem[0][1]}
          text={frontPageItem[0][2]}
        />
        <Thumbnail
          img={frontPageItem[1][0]}
          title={frontPageItem[1][1]}
          text={frontPageItem[1][2]}
        />
        <Thumbnail
          img={frontPageItem[2][0]}
          title={frontPageItem[2][1]}
          text={frontPageItem[2][2]}
        />
      </div>
      <div
        style={{ display: "flex", alignItems: "top", justifyContent: "center" }}
      >
        <Thumbnail
          img={frontPageItem[3][0]}
          title={frontPageItem[3][1]}
          text={frontPageItem[3][2]}
        />
        <Thumbnail
          img={frontPageItem[4][0]}
          title={frontPageItem[4][1]}
          text={frontPageItem[4][2]}
        />
        <Thumbnail
          img={frontPageItem[5][0]}
          title={frontPageItem[5][1]}
          text={frontPageItem[5][2]}
        />
      </div>
    </div>
    */}
    </div>
  </section>
)

export default Recent
