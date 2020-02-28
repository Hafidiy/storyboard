import React from 'react'
import { Api } from '../../constants'
import styles from './index.module.scss'
import { Head } from '../../components/head'
import { Footer } from '../../components/footer'
import { FaRegComment, FaHeart } from 'react-icons/fa'
import { FaRegHeart, FaRegPaperPlane } from 'react-icons/fa'

const text = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cupiditate laborum eum tempora voluptates harum quae blanditiis consequatur sit quod asperiores odio, culpa reiciendis molestiae voluptatem totam vitae? Alias temporibus sed illum reiciendis iste ab eligendi quod at libero modi quos deleniti cumque, dolores omnis fugiat accusantium, laudantium magni earum. Necessitatibus pariatur hic suscipit? Saepe, eveniet. Hic voluptatem, excepturi neque impedit ea reprehenderit aspernatur ex quod ad sunt? Distinctio adipisci, sint possimus quisquam dolore dolorum ipsam pariatur ipsum obcaecati ratione quae fuga esse inventore temporibus assumenda perspiciatis! Accusamus, eveniet! Molestiae ut molestias similique ipsum fugit voluptatem iusto, aliquid rerum ad dolores delectus laudantium sed animi perferendis qui temporibus aspernatur dolorum voluptas ullam autem! Eum doloribus accusantium voluptatem corporis! Aspernatur alias quo nisi voluptatem perferendis delectus nobis, consectetur adipisci consequuntur minima optio, sunt incidunt? Placeat unde at rerum similique iure maiores alias neque totam, consectetur doloremque eaque quos accusamus nesciunt itaque impedit temporibus. Porro repellendus libero dolore voluptate enim illo nobis saepe at autem. Magni iure corrupti quibusdam, vel facere distinctio quae saepe consectetur? Veritatis ipsam modi corporis rerum voluptas odit mollitia dolore exercitationem iure repudiandae architecto ipsa impedit consectetur labore ea harum nihil, dolorem incidunt eum perspiciatis sed. Blanditiis id rem itaque sapiente error quos laboriosam qui! Magnam porro nobis quae voluptatem eligendi cumque id, consequuntur vitae autem sapiente perferendis minus facere laborum illo perspiciatis nam fugit doloremque possimus ipsam. Laborum, soluta cum? Suscipit ab quae reprehenderit vel voluptatum aperiam blanditiis hic optio rerum veritatis. Architecto, inventore. Minus dolorem cupiditate provident aspernatur sunt expedita! Nesciunt, necessitatibus quasi labore vitae sit, ea facilis iusto ullam pariatur iure rerum maiores repellendus magni autem! Ea ducimus nisi ipsa! Maxime molestias sed, quasi fugiat repellat minus. Officiis ducimus alias sed enim, assumenda qui consequatur obcaecati eaque iusto fugit id adipisci dolore quaerat dolorum repellendus quam sit iure beatae blanditiis animi delectus eos doloremque. Voluptatem possimus molestiae tenetur, quas nostrum mollitia sint, reiciendis eaque eius nemo minima ratione placeat fugit, atque optio obcaecati. Recusandae suscipit modi id perferendis pariatur, ipsam, cumque dicta corporis unde distinctio atque. Adipisci nobis cumque voluptate, repellendus debitis placeat cum explicabo, mollitia tempore numquam aut laboriosam! Blanditiis ex earum consectetur voluptatem tenetur, repellat, quidem fuga veniam cum nam non labore similique beatae, minus excepturi? Repudiandae rerum maiores iusto perspiciatis aliquid numquam maxime voluptate sapiente totam harum dicta beatae incidunt sunt, officia obcaecati in similique dolores nesciunt! Laborum dolore, natus, est molestias corrupti non reiciendis repellendus ad nulla maiores et ea, beatae quod perferendis sapiente nemo perspiciatis ipsam cumque officia voluptatibus accusantium ex. Voluptatem, doloremque eius eaque impedit architecto fugit atque molestias eveniet nihil quaerat! Libero adipisci ex necessitatibus accusamus ducimus ratione corporis assumenda expedita, asperiores, aliquid dolore nesciunt. Eos, corporis voluptatum sunt incidunt sequi rerum, quas ullam numquam dolorem, ipsum molestiae quaerat suscipit iure commodi adipisci. Voluptas earum modi repudiandae veritatis animi id eum? Rem odit libero quisquam dolor illo omnis, autem non mollitia quas culpa dolore nihil corrupti possimus velit magni id minima sit enim fuga quod officia ut. Blanditiis, mollitia.'

export class ReadStory extends React.Component{

  state = {
    story: null,
  }

  componentDidMount() {
    this.firstFoo()
  }

  firstFoo = async () => {
    let result = await Api(
      'storyfindbyid',
      { id: this.props.location.state.storyId },
      'PATCH'
    )
    this.setState({ story: result })
    
    if(localStorage.getItem('token'))
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

  render() {
    const { story } = this.state
    return (
      story && <div className={styles.cont}>
        <Head />
          <div className={styles.boxcont}>
            <div className={styles.box}>
              <div className={styles.imgbox}>
                <img src={story.cover} alt='coverimg'/>
              </div>
              <p className={styles.title}>
                {story.title}
              </p>
              <p className={styles.date}>
                {story.date_created.slice(0, 10)}
              </p>
              <p className={styles.author}>
                <i>by</i> {story.author.name}
              </p>
              <div className={styles.iconbox}>
                {story.isLike
                  ? <FaHeart
                  onClick={this.handleLike}
                      className={`${styles.icon} ${styles.red}`}
                      />
                      : <FaRegHeart
                      className={styles.icon}
                      onClick={this.handleLike}
                    />}
                <FaRegComment className={styles.icon}/>
                <FaRegPaperPlane className={styles.icon}/>
              </div>
              <p className={styles.likes}>
                {`${story.likes.length} Likes`}
              </p>
              <div
                className={styles.contentbox}
                dangerouslySetInnerHTML={{ __html: story.content }}
              ></div>
            </div>
          </div>
        <Footer />
      </div>
    )
  }
}