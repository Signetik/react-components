import React from "react"
import styles from "./ClientCard.module.css"

const ClientCard = ({ img, name, role }) => {
  return (
    <div className={styles["clientCard"]}>
      <div
        className={styles["clientCard__img"]}
        style={{ backgroundImage: `url('${img}')` }}
      />
      <div className={styles["clientCard__content"]}>
        <h3>{name}</h3>
        <p>{role}</p>
      </div>
    </div>
  )
}

export default ClientCard
