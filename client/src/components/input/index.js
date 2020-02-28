import React from 'react'
import styles from './index.module.scss'

export const Input = props => {
  return (
    <input
      {...props}
      type={props.type || 'text'}
      className={styles.cont}
      // className={props.inverted ? styles.invertCont : styles.cont}
      placeholder={props.placeholder}
    />
  )
}