import React from "react"
//import { Link } from "gatsby"
import styles from "./ExpertiseBox.module.css"

const ExpertiseBox = ({
  align,
  imageSrc,
  imageAlt,
  name,
  description,
  index,
  link,
}) => {
  return (
    <div className={styles["productbox"]}>
      {align !== "right" ? (
        <div className={styles["productbox__img"]}>
          <img src={imageSrc} alt={imageAlt} />
        </div>
      ) : (
        ""
      )}
      <div
        className={`${styles["productbox__text"]} ${
          align !== "right"
            ? styles["productbox__text--right"]
            : styles["productbox__text--left"]
        }`}
      >
        <div>
          <h1>{index < 9 ? '0' : ''}{index + 1}</h1>
          <h2>{name}</h2>
          <div dangerouslySetInnerHTML={{
                    __html: description,
                    }} />
          { link ? (
            <a href={link} className={`${styles["btn"]} ${styles["btn--main"]}`}>
              learn more
            </a>
          ) : ("")}
        </div>
      </div>
      {align === "right" ? (
        <div className={styles["productbox__img"]}>
          <img src={imageSrc} alt={imageAlt} />
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default ExpertiseBox
