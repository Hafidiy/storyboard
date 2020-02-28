import React from 'react'
import Quill from 'react-quill'
import { ImgModal } from './img-modal'
import styles from './index.module.scss'
import 'react-quill/dist/quill.snow.css'
import { modules, formats } from './constants'
import { Footer } from '../../components/footer'
import { Api, categories} from '../../constants'

export class Editor extends React.Component{

  state = {
    title: '',
    content: '',
    cover: '/images/bookdef.jpg',
    category: '',
    isImgModalVisible: false,
  }

  handleSaveStory = content => this.setState({ content })

  handleCategSelect = ({ target }) => this.setState({ category: target.value })
  
  handleStoryNameChange = ({ target }) => this.setState({ title: target.value })
  
  handleVisibleModal = () => this.setState({ isImgModalVisible: !this.state.isImgModalVisible })

  handleClearState = () => {
    this.setState({ title: '', content: '', category: '' })
  }
  
  handleAddPhoto = ({ nativeEvent }) => {
    let photo = nativeEvent.target.files[0]
    let fD = new FormData()
    fD.append('photo', photo)
    this.setState({ cover: fD })
    const reader = new FileReader()
    reader.readAsDataURL(photo)
    reader.addEventListener(
      'load',
      e => this.setState({ cover: e.target.result })
    )
  }

  handleSubmit = async () => {
    let result = await Api(
      'story',
      {
        ...this.state,
        token: localStorage.getItem('token')
      },
      'POST'
    )
    if(result.error) alert(result.error)
  
    this.handleClearState()
  }
  
  render() {
    return(
      <div className={styles.cont}>
        <div className={styles.about}>
          <input
            type='text'
            name='title'
            value={this.state.title}
            placeholder='Name Story...'
            onChange={this.handleStoryNameChange}
            onBeforeInput={e => e.target.classList.add(styles.active)}
          />
          <div className={styles.select}>
            <select onChange={this.handleCategSelect} >
              <option selected disabled>Select Category...</option>
              {categories.map(categ => (
                <option key={categ}>
                  {categ}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={this.handleVisibleModal}
          >
            Select Photo
          </button>
          <button onClick={this.handleSubmit}>
            Save
          </button>
        </div>
        <Quill
          theme='snow'
          modules={modules}
          formats={formats}
          className={styles.editor}
          value={this.state.content}
          placeholder='Once upon a time'
          onChange={this.handleSaveStory}
        />
        {this.state.isImgModalVisible && 
          <ImgModal
            cover={this.state.cover}
            handleAdd={this.handleAddPhoto}
            handleChange={this.handleVisibleModal}
          />
        }
        <Footer />
      </div>
    )
  }
}