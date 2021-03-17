import React from "react"

export default function Layout({ children }) {
  return (
    <div style={{ margin: `0 auto`, maxWidth: 650, padding: `0 1rem` }}>
      {children}
    </div>
  )
}

// TODO: This is a work in progres. Need more modification and adaptations with files in pages/ folder
