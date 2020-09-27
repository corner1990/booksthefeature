import React, { Component } from 'react'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from 'react-redux'
// import Article from './article' // 文章列表页
import './swiper.scss'
import { getAdvertisingList } from '../api'

const mapState = state => state.global
class SwiperComponent extends Component {
  state = {
    banner: [],
    current: 0,
    indexWidth: 74,
    indexWrapWidth: 360
  }
  componentWillMount () {
    this.loadInfo()
  }

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
      <Image
        src={item.image}
        className='home-swiper-img'
        mode='aspectFill'
      />
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
  /**
   * @desc 加载数据
   */
  async loadInfo() {
    let { errorCode, data } = await getAdvertisingList()
    if (errorCode === 0) {
      this.setState({
        banner: data.advertising_list
      })
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
        {/* //TODO: 需要调整宽度 */}
        <View className='swiper-index-wrap'>
          <View className='swiper-index' style={{...getTransformX() }}></View>
        </View>
      </View>
    )
  }
}

export default connect(mapState)(SwiperComponent)
