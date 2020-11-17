import React, { Component } from 'react'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
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
    return banner.map((item, key) => ( <SwiperItem
      key={key}
      onClick={() => {this.toProduct(item)}}
    >
      <Image
        src={item.image}
        className='home-swiper-img'
        mode='aspectFill'
      />
    </SwiperItem>))
  }
  /**
   * @desc 跳转商品页面
   * @param {*} info 
   */
  toProduct = info => {
    let { link: url } = info
    let reg = /\/pages\/productDetail\/index\?id=\d+/
    if (url &&  reg.test(url)) {
      Taro.navigateTo({
        url
      })
    }
  }
  /**
   * @desc 处理banner下标
   */
  getTransformX = () => {
    let { current, banner, indexWidth, indexWrapWidth } = this.state
    let len = banner.length
    let step = (indexWrapWidth - indexWidth) / (len - 1) / 2
    let style = {
      transform: `translateX(${current * step}px)`,
    }
    // 动态处理宽度
    if (len < 3) {
      style.width = len === 2 ? '50%' : '100%'
    }
    return style
  }
  /**
   * @desc 获取下边， 
   */
  getSwiperIndexBar = () => {
    let { banner } = this.state
    let { getTransformX } = this
    let len = banner.length
    if (len < 2) return ''
    return (<View className='swiper-index-wrap'>
    <View className='swiper-index' style={{...getTransformX() }}></View>
  </View>) 
  }
  /**
   * @desc 加载数据
   */
  async loadInfo() {
    // space_id=1是周花 =2是礼品 =0是首页
    let { errorCode, data } = await getAdvertisingList({space_id: 0})
    if (errorCode === 0) {
      this.setState({
        banner: data.advertising_list
      })
    }
  }
  render () {
    let { getItem, swiperChange , getSwiperIndexBar} = this
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
        { getSwiperIndexBar() }
      </View>
    )
  }
}

export default connect(mapState)(SwiperComponent)
