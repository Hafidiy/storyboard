import styles from './index.module.scss'

import React from 'react'

import { Login } from './login'
import { Register } from './register'
import { MiniDash } from './mini-dash'

import { pageNames } from './constants'

export class Auth extends React.Component{

  timerID = null

  state = { component: pageNames.login, isAnimTrue: false }

  componentDidMount() {
    if(localStorage.getItem('token'))
      this.setState({component: pageNames.dashboard})
  }

  handleChange = component => {
    clearTimeout(this.timerID)
    this.setState({ component, isAnimTrue: true })
    this.timerID = setTimeout(() => this.setState({isAnimTrue: false}), 500)
  }

  renderComponent = () => {
    const { component } = this.state
    const { login, register, dashboard } = pageNames

    if(component === login)
      return <Login handleChange={this.handleChange} />
      else if(component === register)
        return <Register handleChange={this.handleChange} />
          else if(component === dashboard)
            return <MiniDash handleChange={this.handleChange} />
  }

  render(){
    return (
      <div
        className={`${styles.cont} ${this.state.isAnimTrue ? styles.anim : ''}`}
      >
        {this.renderComponent()}
      </div>
    )
  }
}