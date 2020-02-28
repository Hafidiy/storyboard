import React from 'react'
import { Input } from '../../input'
import { Button } from '../../button'
import { Api } from '../../../constants'
import { pageNames } from '../constants'
import styles from './index.module.scss'

export class Login extends React.Component{

  state = {
    email: '',
    password: '',
  }

  handleChange = ({ target }) => { this.setState({ [target.name]: target.value }) }

  handleSubmit = async () => {
    const { email } = this.state
    
    if(email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      alert('Wron email')
      return 0
    }
    let result = await Api('login', this.state, 'POST')

    if(result.error){
      alert(result.error)
      return 0
    }

    localStorage.setItem('token', result.token)
    this.props.handleChange(pageNames.dashboard)

    Object.keys(this.state).map(item => this.setState({ [item]: '' }))
  }

  render() {
    const { email, password } = this.state
    return (
      <div className={styles.cont}>
        <p>Login</p>
        <Input
          type='email'
          name='email'
          value={email}
          placeholder='Email...'
          onChange={this.handleChange}
        />
        <Input
          type='password'
          name='password'
          value={password}
          placeholder='Password...'
          onChange={this.handleChange}
        />
        <Button
          full
          title={'Sign in'}
          onClick={this.handleSubmit}
        />
        <p
          onClick={() => this.props.handleChange(pageNames.register)}
        >
          Don't have an account yet?
        </p>
      </div>
    )
  }
}