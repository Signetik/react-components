import React from "react"
import "./ClientCard.css"

const ClientCard = ({ img, name, role }) => {
  return (
    <div className="clientCard">
      <div
        className="clientCard__img"
        style={{ backgroundImage: `url('${img}')` }}
      />
      <div className="clientCard__content">
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
    </div>
  )
}

export default ClientCard
