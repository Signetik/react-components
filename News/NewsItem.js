import React from "react"
import styles from "./News.module.css"

const NewsItem = ({
                       number, title, text, src
                     }) => {
  const textClassName = `news-text-${number}`
  return (
    <div className={styles["news-item"]}>
        {
            <img className={styles["newsimage-1"]} src={src} />
        }
      <div className={`${styles["news-text"]} ${styles[textClassName]}`}>{title}</div>
      <div className={styles["news-text-long"]} >{text}</div>
    </div>
  )
}

export default NewsItem
