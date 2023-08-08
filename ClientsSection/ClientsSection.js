import React from "react"
import ClientCard from "./ClientCard"
//import { graphql, useStaticQuery } from "gatsby"

import styles from "./ClientsSection.module.css"

import clients from '../../data/clients.json';

export function generateRandomClientsIndex() {
  var count = clients.length

  var index = new Array(3);

  index.fill(0);

  var idx = 0
  while (idx < 3) {
    var duplicate = false
    var r = Math.floor(Math.random() * count)
    for (var i = 0 ; i < idx ; i++) {
      if (r === index[i]) {
        duplicate = true
      }
    }
    if (!duplicate && !clients[r].disabled) {
      //console.log("Index " + idx.toString() + " value " + r.toString())
      index[idx++] = r;
    }
  }

  return index;
}

const ClientsSection = ({clientsIndex}) => {
  const index = clientsIndex;

  if (!index) {
    return <div>Loading...</div>
  }

  return (
    <section className={styles["clientsSec"]}>
      <div className={styles["clientContainer"]}>
        <h2 className="sec-title">Our Customers</h2>
        <div className={styles["clientsWrap"]}>
          { index.map(idx => (
            <ClientCard
              key={clients[idx].name}
              img={clients[idx].image}
              name={clients[idx].name}
              role={clients[idx].description}
              target={clients[idx].target}
            />
          ))}
        </div>
      </div>
    </section>
  )
  return (<div></div>)
}

export default ClientsSection
