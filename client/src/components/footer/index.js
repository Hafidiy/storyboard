import React from 'react'
import styles from './index.module.scss'

export const Footer = () => {
  
  return(
    <div className={styles.cont}>
      Copyright &copy; {new Date().getFullYear().toString().slice()}
    </div>
  )
}