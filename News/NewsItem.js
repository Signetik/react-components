import React from "react"
import "./News.css"

const NewsItem = ({
                       number, text, src
                     }) => {
  const textClassName = `news-text news-text-${number}`
  return (
    <div className="news-item">
        {
          number == 1 ? (
              <img className="newsimage-1" src={src} />
          ) : number == 2 ? (
            <img className="newsimage-2" src="https://picsum.photos/600/300" />
          ) : ("")
        }
      <div className={textClassName}>{text}</div>
    </div>
  )
}

export default NewsItem