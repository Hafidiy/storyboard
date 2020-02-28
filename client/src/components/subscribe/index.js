import React from 'react'
import styles from './index.module.scss'

export const Subscribe = () => {

  return (
    <div className={styles.cont}>
      <input
        type='email'
        className={styles.input}
      />
      <button
        className={styles.button}
      >
        Subscribe
      </button>
      <p className={styles.p}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
        Quae modi minus laboriosam culpa at repudiandae.
      </p>
    </div>
  )
}