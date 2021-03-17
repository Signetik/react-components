import React from "react"
import ClientCard from "./ClientCard"
//import { graphql, useStaticQuery } from "gatsby"

import "./ClientsSection.css"

import data from '../../data/clients.json';

const ClientsSection = () => {
  var index = [0, 0, 0]

  var clients = data
  var count = clients.length

  var idx = 0
  while (idx < 3) {
    var duplicate = false
    var r = Math.floor(Math.random() * count)
    for (var i = 0 ; i < idx ; i++) {
      if (r === index[i]) {
        duplicate = true
      }
    }
    if (!duplicate) {
      console.log("Index " + idx.toString() + " value " + r.toString())
      index[idx++] = r;
    }
  }

  return (
    <section className="clientsSec">
      <div className="clientContainer">
        <h2 className="sec-title">Our Customers</h2>
        <div className="clientsWrap">
          { index.map(idx => (
            <ClientCard
              key={clients[idx].name}
              img={clients[idx].image}
              name={clients[idx].name}
              role={clients[idx].description}
            />
          ))}
        </div>
      </div>
    </section>
  )
  return (<div></div>)
}

export default ClientsSection
