import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtButton } from 'taro-ui'
import CustomNavBar from '../../../components/navbar'

import './home.scss'


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
    let title = 'FLOWERPLUS花加'
    let { showNavBar } = this.state
    if(!showNavBar) return ''
    return (<CustomNavBar title={title} />)
  }
  render () {
    
    let { touchstart } = this
    let { isTouch } = this.state

    return (
      <View className={`home ${isTouch ? 'hidden': ''}`} onTouchStart={touchstart} onTouchMove={touchstart}>
        { this.getNavBar() }
        <AtButton>按钮文案</AtButton>
        <AtButton type='primary'>按钮文案</AtButton>
        <AtButton type='secondary'>按钮文案</AtButton>
      </View>
    )
  }
}

export default connect(mapState)(Home)
