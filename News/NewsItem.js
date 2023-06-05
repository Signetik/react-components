import React from "react"
import "./News.css"

const NewsItem = ({
                       number, title, text, src
                     }) => {
  const textClassName = `news-text news-text-${number}`
  return (
    <div className="news-item">
        {
            <img className="newsimage-1" src={src} />
        }
      <div className={textClassName}>{title}</div>
      <div className="news-text-long" >{text}</div>
    </div>
  )
}

export default NewsItem
