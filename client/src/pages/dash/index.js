import React from 'react'
import { Api } from '../../constants'
import { FaHome } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import Button from '@material-ui/core/Button'
import { Input } from '../../components/input'
import { Footer } from '../../components/footer'
import { SingleStory } from '../../components/single'

export class Dash extends React.Component{

  state = {
    name: '',
    avatar: '',
    newName: '',
    stories: '',
    newAvatar: '',
    oldPassword: '',
    newPassword: '',
    newRePassword: '',
  }

  componentDidMount() {
    this.firstFoo()
  }

  firstFoo = async () => {
    let result = await Api(
      'userInfo',
      { token: localStorage.getItem('token') },
      'POST'
    )

    if(result.error) {
      alert(result.error)
      return 0
    }

    this.setState({
      name: result.name,
      stories: result.stories,
      avatar: result.avatar,
      newAvatar: result.avatar,
    })
  }

  handleChange = ({ target }) => { this.setState({ [target.name]: target.value }) }
  
  handleAddPhoto = ({ nativeEvent }) => {
    let photo = nativeEvent.target.files[0]
    let fD = new FormData()
    fD.append('photo', photo)
    this.setState({ newAvatar: fD })
    const reader = new FileReader()
    reader.readAsDataURL(photo)
    reader.addEventListener(
      'load',
      e => this.setState({ newAvatar: e.target.result })
    )
  }

  handleUserSubmit = async () => {
    const { newName, oldPassword, newPassword, newAvatar, newRePassword } = this.state
    const tmp = [newName, oldPassword, newPassword, newRePassword]
    
    if (!(tmp.every(item => item !== ''))){
      alert('Please not empty fields!')
      return 0
    }
      
    if (newPassword !== newRePassword) {
      alert('Passwords are not same!')
      return 0
    }

    let result = await Api(
      'userInfo',
      {
        oldPassword,
        newPassword,
        name: newName,
        avatar: newAvatar,
        token: localStorage.getItem('token'),
      },
      'PUT'
    )

    if(result.error) {
      alert(result.error)
      return 0
    }

    Object.keys(this.state).filter(
      word => word !== 'name' && word !== 'avatar' && word !== 'newAvatar' && word !== 'stories'
    )
    .map(item => this.setState({ [item]: '' }))
    this.setState({
      name: result.name,
      avatar: result.avatar,
      stories: result.stories,
    })
  }

  handleStoryDelete = async id => {
    let result = await Api(
      'story',
      {
        token: localStorage.getItem('token'),
        storyId: id
      },
      'DELETE'
    )
    if(!result.error){
      this.setState({ stories: result.stories })
    } else {
      alert(result.error)
    }
  }

  render(){
    const {
      name, avatar, newAvatar, newName, stories,
      oldPassword, newPassword, newRePassword  
    } = this.state
    return(
      <div className={styles.cont}>
        <div className={styles.header}>
          <Link to='/'>
            <FaHome className={styles.imIcon}/>
          </Link>

          <div className={styles.avatarBox}>
            <div className={styles.avatar}>
              <img src={avatar} alt='img'/>
            </div>
            <p>{name}</p>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.stories}>
            {Object.keys(stories).map((item, index) => (
              <SingleStory
                key={index}
                handleDelete={this.handleStoryDelete}
                state={
                  {
                    story: stories[index],
                    name: this.state.name
                  }
                }
              />
            ))}
          </div>
          <div className={styles.dashboard}>
            <div className={styles.newImg}>
              <img src={newAvatar} alt='primg'/>
            </div>
            <input
              id='dd'
              type='file'
              className={styles.dn}
              onChange={this.handleAddPhoto}
            />
            <Button
              color='primary'
              variant='outlined'
              className={styles.autoSize}
            >
              <label htmlFor='dd'>
                Change Photo
              </label>
            </Button>
            <Input
              name='newName'
              value={newName}
              placeholder='New Name...'
              onChange={this.handleChange}
            />
            <p className={styles.chP}>Change Password</p>
            <Input
              type='password'
              name='oldPassword'
              value={oldPassword}
              placeholder='Password...'
              onChange={this.handleChange}
            />
            <Input
              type='password'
              name='newPassword'
              value={newPassword}
              placeholder='New Password...'
              onChange={this.handleChange}
            />
            <Input
              type='password'
              name='newRePassword'
              value={newRePassword}
              onChange={this.handleChange}
              placeholder='Confirm New Password...'
            />
            <Button
              color='primary'
              variant='contained'
              className={styles.autoSize}
              onClick={this.handleUserSubmit}
            >
              Save
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}