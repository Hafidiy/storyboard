import styles from './index.module.scss'

import React from 'react'

import { Auth } from '../auth'

export const Header = () => {

  return(
    <div className={styles.cont}>
      <Auth />
    </div>
  )
}