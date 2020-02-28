import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import {categories} from '../../constants'


export const Categories = props => (
  <div className={styles.cont}>
    <div className={styles.box}>
      {categories.map((item, index) => (
        <Link
          to={{
            pathname: '/storiesbox',
            state: { name: item, type: 'category' }
          }}
          style={{ textDecoration: 'none' }}
        >
          <div
            key={index}
            className={styles.boxItem}
          >
            {item}
          </div>
        </Link>
      ))}
    </div>
  </div>
)