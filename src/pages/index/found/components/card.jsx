import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  state = {
    // eslint-disable-next-line react/no-unused-state
    value: '',
    src: 'https://ipxcdn.jfshare.com/ipxmall/0b44041be7deff3e80561932025a1243'
  }
  componentDidMount () {
  }
  onChange (value) {
    this.setState({
      // eslint-disable-next-line react/no-unused-state
      value
    })
  }
  render () {
    let { src } = this.state
    return (
      <View className={['at-col', `at-colo-1`]}>
        <Image src={src} />
      </View>
    )
  }
}