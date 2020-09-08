import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'

import './article-item.scss'


export default class Index extends Component {

  componentWillMount() { }

  componentDidMount() { }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  toDetail = () => {
    Taro.navigateTo({ url: '/pages/articleDetail/index' })
  }

  render() {
    let src = 'https://wx3.sinaimg.cn/mw690/008b8TwTgy1giboq2g2lmj30qk0aw16s.jpg'
    let src2 = 'https://wx3.sinaimg.cn/mw690/008b8TwTgy1gibp9swnntj302a029jrn.jpg'

    return (
      <View className='article-list-item' onClick={() => { this.toDetail() }}>
        <View className='article-time'>上午9:15</View>
        <Image src={src} className='article-img'></Image>
        <View className='content-wrap'>
          <View className='content-item'>
            <View className='content-text'>品项:多维点染眉⽴体野⽣眉 绒⽑织补术,⽑发还原术⾯部磁场能量数字调整。</View>
            <Image src={src2} className='content-img'></Image>
          </View>
          <View className='content-item'>
            <View className='content-text'>品项:多维点染眉⽴体野⽣眉 绒⽑织补术,⽑发还原术⾯部磁场能量数字调整。</View>
            <Image src={src2} className='content-img'></Image>
          </View>
        </View>
      </View>
    )
  }
}
