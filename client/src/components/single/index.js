import React from 'react'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { MdDelete } from "react-icons/md";

export const SingleStory = props => {

  return(
    <div className={styles.cont}>
      <Link to={{
        pathname: '/readstory',
        state: {
          fromDashboard: true,
          storyId: props.state.story._id,
        }
      }}>
        <div className={styles.absolute}></div>
      </Link>
      <div className={styles.img}>
        <img src={props.state.story.cover} alt='img'/>
      </div>
      <div className={styles.box}>
        <p className={styles.title}>
          {props.state.story.title}
        </p>
        <p
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: props.state.story.content }}
        ></p>
        <MdDelete
          className={styles.iconDel}
          onClick={() => props.handleDelete(props.state.story._id)}
        />
      </div>
    </div>
  )
}