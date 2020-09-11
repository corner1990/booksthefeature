import React, { Component } from 'react'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from 'react-redux'
// import Article from './article' // 文章列表页
import './swiper.scss'

const mapState = state => state.global
class SwiperComponent extends Component {
  state = {
    // tab只有三个，当下标大于2的组件在内页跳转的时候需要在global中配置当前组件的坐标到对应的tab active 中
    // 如Endorsement下标为3, 我需要他展示我的，那么我需要3 配置到{ title: '我的', iconType: 'user', active: [ 2, 3]} 中
    banner: [
      'https://ipxcdn.jfshare.com/system/star/f68e734b111d90f7a0a80186749e193a.jpg?x-oss-process=image/resize,m_fill,h_560,w_750',
      'https://ipxcdn.jfshare.com/system/star/462654947c70d56a888532cef8348842.jpg?x-oss-process=image/resize,m_fill,h_560,w_750',
      'https://ipxcdn.jfshare.com/scrape/starBgs/%E5%BC%A0%E7%BF%B0.jpg?x-oss-process=image/resize,m_fill,h_560,w_750'
    ],
    current: 0,
    indexWidth: 74,
    indexWrapWidth: 360
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  /**
   * @desc swiper 切换
   * @param  {...any} args 
   */
  swiperChange = e => {
    let { 
      detail: {
        current
      }
    } = e
    this.setState({ current })
    
  }
  /**
   * @desc 获取banner列表
   */
  getItem = () => {
    let { banner } = this.state
    return banner.map((item, key) => ( <SwiperItem key={key}>
      <Image src={item} className='home-swiper-img' />
    </SwiperItem>))
  }
  /**
   * @desc 处理banner下标
   */
  getTransformX = () => {
    let { current, banner, indexWidth, indexWrapWidth } = this.state
    let step = (indexWrapWidth - indexWidth) / (banner.length - 1) / 2
    return {
      transform: `translateX(${current * step}px)`
    }
  }
  render () {
    let { getItem, swiperChange, getTransformX } = this
    return (
      <View className='home-swiper-wrap'>
        <Swiper
          className='home-swiper'
          circular
          autoplay
          onChange={ swiperChange }
        >
          { getItem() }
        </Swiper>
        <View className='swiper-index-wrap'>
          <View className='swiper-index' style={{...getTransformX() }}></View>
        </View>
      </View>
    )
  }
}

export default connect(mapState)(SwiperComponent)
