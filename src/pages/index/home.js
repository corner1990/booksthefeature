import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import CustomNavBar from '../../components/navbar'

import './home.scss'

import MainProduct from './home/main-product'
import OrderNews from './home/order-news'
import NewsWarp from './home/news-warp'

const mapState = state => state.global
class Home extends Component {
  state = {
    isTouch: false,
    showNavBar: true
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  touchstart = e => {
    e.stopPropagation()
    e.preventDefault()
    let { isTouch } = this.state
    if(isTouch) {
      this.setIsTouch()
    }
  }
  /**
   * @desc 控制是否页面可以滚动
   * @param { number | undefined } val 
   */
  setIsTouch = (isTouch = false) => {
    this.setState({ isTouch })
  }
  /**
   * @desc 动态控制是否显示navBar
   */
  getNavBar = () => {
    let title = '首页'
    let { showNavBar } = this.state
    if(!showNavBar) return ''
    return (<CustomNavBar title={title} />)
  }
  render () {
    
    let { touchstart, setIsTouch } = this
    let { isTouch } = this.state

    return (
      <View className={`home ${isTouch ? 'hidden': ''}`} onTouchStart={touchstart} onTouchMove={touchstart}>
        { this.getNavBar() }
        <MainProduct setIsTouch={setIsTouch} />
        <OrderNews />
        <NewsWarp />
      </View>
    )
  }
}

export default connect(mapState)(Home)
