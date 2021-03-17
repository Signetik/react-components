import React from "react"

import NewsItem from "./NewsItem"

import n1 from '../../data/news/newsite.json';
import n2 from '../../data/news/newsite.json';
import n3 from '../../data/news/newsite.json';

const news = n1.concat(n2, n3);


export default function News() {
  return (
    <div className="news">
      <h2 className="sec-title">Latest News</h2>
    <div className="newsimage">
      <div className="newsimage-sub">
        <NewsItem number="2" text="Text" src="https://picsum.photos/600/300" />
        <NewsItem number="2" text="Text" src="https://picsum.photos/600/300" />
      </div>
      <NewsItem number="1" text={news[0].title} src={news[0].img.src}/>
      <div className="newsimage-sub">
        <NewsItem number="2" text="Text" src="https://picsum.photos/600/300" />
        <NewsItem number="2" text="Text" src="https://picsum.photos/600/300" />
      </div>
    </div>
    </div>
  )
}
