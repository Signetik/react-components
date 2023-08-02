import React, {useEffect} from "react"

import NewsItem from "./NewsItem"

import n1 from '../../data/news/newsite.json';
import n2 from '../../data/news/newsite.json';
import n3 from '../../data/news/newsite.json';

import styles from "./News.module.css"

/*const news = n1.concat(n2, n3);*/
const news = n1

export function generateRandomNewsIndex() {
  var count = news.length

  var index = new Array(count);

  index.fill(0);

  var idx = 0
  while (idx < 2) {
    var duplicate = false
    var r = Math.floor(Math.random() * count)
    for (var i = 0 ; i < idx ; i++) {
      if (r === index[i]) {
        duplicate = true
      }
    }
    if (!duplicate) {
      //console.log("Index " + idx.toString() + " value " + r.toString())
      index[idx++] = r;
    }
  }

  return index;
}

export default function News({newsIndex}) {
  const index = newsIndex;
  
  if (!index) {
    return <div>Loading...</div>
  }
  return (
    <div className={styles["news"]}>
      <h2 className="sec-title">Latest News</h2>
    <div className={styles["newsimage"]}>
      <div className={styles["newsimage-center"]}>
        <NewsItem number="1" title={news[index[0]].title} text={news[index[0]].text} src={news[index[0]].img.src}/>
      </div>
      <div className={styles["newsimage-center"]}>
        <NewsItem number="2" title={news[index[1]].title} text={news[index[1]].text} src={news[index[1]].img.src}/>
      </div>
    </div>
    </div>
  )
}