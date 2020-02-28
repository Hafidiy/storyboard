import React from 'react'
import { Input } from '../../input'
import { Button } from '../../button'
import { Api } from '../../../constants'
import styles from './index.module.scss'
import { pageNames } from '../constants'

export class Register extends React.Component{

  state = {
    email: '',
    password: '',
    rePassword: ''
  }

  handleChange = ({ target }) => { this.setState({ [target.name]: target.value }) }

  handleSubmit = async () => {
    let { email, password, rePassword } = this.state

    if(email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      alert('Wrong email')
      return 0
    }

    if (password !== rePassword || password === '') {
      alert('Wrong password')
      return 0
    }

    let result = await Api(
      'registration',
      this.state,
      'POST'
    )

    if(result.error) {
      alert(result.error)
      return 0
    }

    localStorage.setItem('token', result.token)
    this.props.handleChange(pageNames.dashboard)

    Object.keys(this.state).map(item => this.setState({ [item]: '' }))
  }

  render() {
    const { email, password, rePassword } = this.state
    return (
      <div className={styles.cont}>
        <p>Register</p>
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
        <Input
          type='password'
          name='rePassword'
          value={rePassword}
          placeholder='Confirm Password...'
          onChange={this.handleChange}
        />
        <Button
          full
          title='Sign up'
          onClick={this.handleSubmit}
        />
        <p
          onClick={() => this.props.handleChange(pageNames.login)}
        >
          I have an account already!
        </p>
      </div>
    )
  }
}