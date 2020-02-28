import React from 'react'
import styles from './index.module.scss'
import Button from '@material-ui/core/Button'

export const ImgModal = props => (
  <div className={styles.cont}>
    <div
      className={styles.noneBox}
      onClick={props.handleChange}
    ></div>
    <div className={styles.mBox}>
      <div className={styles.imgBox}>
        <img
          alt='imgbook'
          src={props.cover}
        />
      </div>
      <div className={styles.btnBox}>
        <input
          id='aa'
          type='file'
          className={styles.dn}
          onChange={props.handleAdd}
        />
        <Button
          className={styles.btnSize}
          variant='outlined'
          color='primary'
        >
          <label
            htmlFor='aa'
            className={styles.cp}
          >
            Add Photo
          </label>
        </Button>
        <Button
          color='primary'
          variant='contained'
          className={styles.btnSize}
          onClick={props.handleChange}
        >
          Save
        </Button>
      </div>
    </div>
  </div>
)