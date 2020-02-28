import React from 'react'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { IoMdChatbubbles } from 'react-icons/io'

export const Head = props => (
  <header>
    <Link to='/'>
      <FaHome className={styles.swht}/>
    </Link>
    {/* <Link to='/chat'>
      <IoMdChatbubbles
        className={styles.swht}
        style={{ marginLeft: '3vw' }}
      />
    </Link> */}
  </header>
)