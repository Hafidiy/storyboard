import React from 'react'
import { Link } from 'react-router-dom'
import { pageNames } from '../constants'
import styles from './index.module.scss'
import { FiEdit3 } from 'react-icons/fi'
import { Api } from '../../../constants'
import { IoMdExit } from 'react-icons/io'
import { IoIosConstruct } from "react-icons/io"

export class MiniDash extends React.Component{

  state = {
    name: '',
    avatar: '',
  }

  componentDidMount = async () => {
    let result = await Api(
      'userInfo',
      { token: localStorage.getItem('token') },
      'POST'
    )
    if(!result.error) {
      this.setState({ name: result.name, avatar: result.avatar })
    } else {
      this.props.handleChange(pageNames.login)
    }
  }

  handleChange = () => {
    localStorage.removeItem('token')
    this.props.handleChange(pageNames.login)
  }

  render() {
    const { avatar, name } = this.state
    return(
      <div className={styles.cont}>
        <div className={styles.Avatar}>
          <img src={avatar} alt='img'/>
        </div>
        <p className={styles.p}>{name}</p>
        <div className={styles.icons}>
          <Link className={styles.link} to='/editor'>
            <div>
              <FiEdit3 className={styles.icon} />
              <p>Editor</p>
            </div>
          </Link>
          <Link className={styles.link} to='/dashboard'>
            <div>
              <IoIosConstruct className={styles.icon} />
              <p>Dashboard</p>
            </div>
          </Link>
          <div onClick={this.handleChange} >
            <IoMdExit className={styles.icon} />
            <p>Log Out</p>
          </div>
        </div>
      </div>
    )
  }
}