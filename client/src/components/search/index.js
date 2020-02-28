import React from 'react'
import { Api } from '../../constants'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'
import { GoSearch } from 'react-icons/go'

export class Search extends React.Component{

  state = {
    onPos: true,
    findStory: '',
    stories: []
  }

  handleChange = ({ target }) => this.setState({ findStory: target.value })
  
  handleEnter = e => {
    if(e.which === 13){
      this.handleSearch()
      this.setState({onPos: false})
    }
  }

  handleSearch = async () => {
    let result = await Api(
      'storyfind',
      { storyName: this.state.findStory },
      'PATCH'
    )
    this.setState({ stories: result })
  }

  render(){
    const { findStory, onPos, stories } = this.state
    return(
      <div className={`
        ${styles.cont}
        ${onPos ? styles.Postrue : styles.Posfalse}
      `}>
        <div className={
          onPos ? styles.searchboxCentre : styles.searchboxTop
        }>
          <input
            type='text'
            placeholder='Search...'
            className={styles.input}
            onKeyUp={this.handleEnter}
            onChange={this.handleChange}
          />
          <GoSearch
            onClick={() => {
              this.handleSearch()
              this.setState({onPos: false})
            }}
            className={styles.icon}
          />
        </div>
        <div className={
          onPos ? styles.h0 : styles.contentbox
        }>
          {stories.map(item => (
            <div className={
              onPos ? styles.dn : styles.single
            }>
              <div className={
                onPos ? styles.dn : styles.singlecover
              }>
                <img
                  alt='coverimg'
                  src={item.cover}
                />
              </div>
              <div className={
                onPos ? styles.dn : styles.singlecontent
              }>
                <p className={
                  onPos ? styles.dn : styles.singletitle
                }>
                  {item.title}
                  <Link
                    to={{
                      pathname: '/storiesbox',
                      state: { name: item.author.name, type: 'author' }
                    }}
                    style={{ textDecoration: 'none' }}
                  >
                    <span><i>by {item.author.name}</i></span>
                  </Link>
                </p>
                <p
                  dangerouslySetInnerHTML={{ __html: item.content }}
                  className={
                    onPos ? styles.dn : styles.singlebody
                }></p>
                <div>
                  <p>
                    {`${item.likes.length} Likes`}
                  </p>
                  <Link to={{
                    pathname: '/readstory',
                    state: {
                      fromDashboard: true,
                      storyId: item._id,
                    }
                  }}>
                    <button>Read More</button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}