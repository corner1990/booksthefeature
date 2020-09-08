import React, { Component } from 'react'
import { View } from '@tarojs/components'
// import { AtButton } from 'taro-ui'

// import "taro-ui/dist/style/components/button.scss" // 按需引入
// import "taro-ui/dist/style/components/nav-bar.scss";
// import "taro-ui/dist/style/components/icon.scss";
import './news-warp.scss'
import NewItem from './new-item'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  createItem() {
    let arr = [
      {
        img: 'https://ipxcdn.jfshare.com/ipxmall/524d44840865e8498b7ed502ef18b195',
        title: '2020年8月刊'
      },
      {
        img: 'https://ipxcdn.jfshare.com/ipxmall/6e023bf2bd069afbc56e66ae8d215e0b',
        title: '2020年7月刊'
      },
      {
        img: 'https://ipxcdn.jfshare.com/ipxmall/6e023bf2bd069afbc56e66ae8d215e0b',
        title: '2020年6月刊'
      }
    ]

    return arr.map((item, key)=> (<NewItem key={key} info={item} />))
  }
  render () {
    return (
      <View className='news-warp'>
        <View className='news-wrap-text'>RONGUAN</View>
        <View className='news-wrap-text'>SHOP 全部杂志</View>
        <View className='news-list-wrap'>
          <View className='news-list'>
            { this.createItem() }
          </View>
        </View>
      </View>
    )
  }
}
