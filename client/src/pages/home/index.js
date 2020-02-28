import styles from './index.module.sass'

import React from 'react'

import { Header } from '../../components/header'
import { Search } from '../../components/search'
import { Footer } from '../../components/footer'
import { Navbar } from '../../components/navbar'
import { RandomSt } from '../../components/random'
import { Subscribe } from '../../components/subscribe'
import { Categories } from '../../components/categories'

export class Home extends React.Component{

  handleChangePage = index => this.cont.scrollTo({
    left: 0,
    behavior: 'smooth',
    top: index * window.innerHeight,
  })

  render() {
    return (
      <div className={styles.cont} ref={r => this.cont = r}>
        <Navbar handleChangePage={this.handleChangePage} />
        <Header />
        <RandomSt />
        <Search />
        <Categories />
        {/* <Subscribe /> */}
        <Footer />
      </div>
    )
  }
}