import styles from './index.module.scss'

import React, { useState } from 'react'

import { navItems } from '../../constants'

export const Navbar = props => {
  const [isNavVisible, setNavVisible] = useState(false)

  const handleMagic = () => setNavVisible(!isNavVisible)

  return(
    <div className={styles.cont}>
      <div
        onClick={handleMagic}
        className={`${styles.btnMenu} ${
          isNavVisible ? styles.close : ''
        }`}
      >
        <div className={`${styles.btnLine} ${
          isNavVisible ? styles.show : ''
        }`}></div>
        <div className={`${styles.btnLine} ${
          isNavVisible ? styles.show : ''
        }`}></div>
        <div className={`${styles.btnLine} ${
          isNavVisible ? styles.show : ''
        }`}></div>
      </div>
      <div className={`${styles.navMenu} ${
        isNavVisible ? styles.show : ''
      }`}>
        {navItems.map((item, index) => 
          <div
            key={index}
            onClick={() => props.handleChangePage(index)}
            className={`${styles.navItem} ${
              isNavVisible ? styles.show : ''
            }`}
          >
            {item}
          </div>
        )}
      </div>
    </div>
  )
}