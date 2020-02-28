import React from 'react'
import { Api } from '../../constants'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { Head } from '../../components/head'
import { Footer } from '../../components/footer'

export class SBox extends React.Component{

  state = {
    name: '',
    stories: null,
  }

  componentDidMount = () => {
    this.firstFoo()
  }

  firstFoo = async () => {
    const { name, type } = this.props.location.state
    this.setState({name})
    
    let result = await Api(
      'story',
      type === 'category' ? { category: name } : { author: name },
      'PUT'
    )
    if(!result.error)
      this.setState({ stories: result })
    else
      alert(result.error)
  }

  render(){
    const { name, stories } = this.state
    return(
      <div className={styles.cont}>
        <Head />
        <div className={styles.box}>
          {stories ? stories.map(item => (
            <div className={styles.single}>
              <div className={styles.imgbox}>
                <img
                  alt='coverimg'
                  src={item.cover}
                />
              </div>
              <div className={styles.content}>
                <p className={styles.title}>
                  {item.title}
                  <span><i>by</i>{item.author.name}</span>
                </p>
                <p
                  className={styles.story}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                ></p>
                <div>
                  <p className={styles.likes}>
                    {`${item.likes.length} Likes`}
                  </p>
                  <Link to={{
                    pathname: '/readstory',
                    state: {
                      fromDashboard: true,
                      storyId: item._id,
                    }
                  }}>
                    <button className={styles.read}>
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          )) : (
            <div className={styles.noStory}>No any Stories</div>
          )}
        </div>
        <Footer />
      </div>
    )
  }
}