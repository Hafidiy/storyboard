import React from 'react'
import { Api } from '../../constants'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import Typography from '@material-ui/core/Typography'
import { FaRegComment, FaHeart } from 'react-icons/fa'
import { FaRegHeart, FaRegPaperPlane } from 'react-icons/fa'

export class RandomSt extends React.Component{
  state = {
    story: '',
  }

  componentDidMount() {
    this.firstFoo()
  }

  firstFoo = async () => {
    let result = await Api('story')
    if(result.length && !result.error) {
      result = result[Math.trunc(Math.random() * 1000 % result.length)]
      result.date_created = result.date_created.slice(0, 10)
      this.setState({story: result})
    }
    if (localStorage.getItem('token'))
      this.secondFoo()
  }

  secondFoo = async () => {
    const { story } = this.state
    let result = await Api(
      'story/like',
      { token: localStorage.getItem('token') },
      'PATCH'
    )
    if(result.error) {
      alert(result.error)
      return 0
    }

    result.map(rItem => {
      if(rItem === story._id){
        let tmp = {...story}
        tmp.isLike = true
        this.setState({story: tmp})
      }
    })
  }

  handleLike = async () => {
    if(!(localStorage.getItem('token'))){
      alert('You must sign in!')
      return 0
    }

    let result = await Api(
      'story/like',
      {
        token: localStorage.getItem('token'),
        ...this.state.story,
        isLike: this.state.story.isLike
          ? 'disLike' : 'like'
      },
      'PUT'
    )

    if(result.error){
      alert(result.error)
      return 0
    }

    result.date_created = result.date_created.slice(0, 10)
    this.setState({ story: result })
    this.secondFoo()
  }

  render(){
    const { story } = this.state
    return(
      story && <div className={styles.cont}>
        <div className={styles.box}>
          <div className={styles.imgBox}>
            <img
              src={story.cover}
              alt='coverimg'
            />
          </div>
          <div className={styles.contStory}>
            <p className={styles.title}>
              {story.title}
              <Link
                to={{
                  pathname: '/storiesbox',
                  state: { name: story.author.name, type: 'author' }
                }}
                style={{ textDecoration: 'none' }}
              >
                <span><i>by {story.author.name}</i></span>
              </Link>
            </p>
            <p className={styles.date}>
              {story.date_created}
            </p>
            <Typography
              className={styles.content}
              dangerouslySetInnerHTML={{ __html: story.content }}
            ></Typography>
            <div className={styles.bottomBox}>
              <div className={styles.icons}>
                {story.isLike
                  ? <FaHeart
                      onClick={this.handleLike}
                      className={`${styles.icon} ${styles.red}`}
                    />
                  : <FaRegHeart
                      className={styles.icon}
                      onClick={this.handleLike}
                    />
                }
                <FaRegComment className={styles.icon}/>
                <FaRegPaperPlane className={styles.icon}/>
              </div>
              <Link to={{
                pathname: '/readstory',
                state: {
                  fromDashboard: true,
                  storyId: this.state.story._id,
                }
              }}>
                <button className={styles.button}>Read Story</button>
              </Link>
            </div>
            <p className={styles.likes}>
              {`${story.likes.length ? story.likes.length : 0} Likes`}
            </p>
          </div>
        </div>
      </div>
    )
  }
}