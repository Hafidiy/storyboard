import React from 'react'
import styles from './index.module.scss'

export const Button = props => {
  return (
    <button
      {...props}
      className={`
        ${styles.cont}
        ${props.full && styles.full}
        `}
        // ${props.isBlack ? styles.btnbl : styles.btn}
    >
      {props.title}
    </button>
  )
}