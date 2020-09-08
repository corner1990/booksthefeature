'use strtic';
import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import './index-card.scss'
/**
 * @desc 序号展示图片
 * @param {*} props 
 */
class IndexCard extends Component {
  
  state = {
    style: {
      width: '100%',
      height: 240
    }
  }
  onload = loadInfo => {
    console.log('loadInfo', loadInfo)
  }

  render() {
    let { img } = this.props
    let { style } = this.state
    let { onload } = this
    return (<View className='index-card'>
    <Image
      src={img}
      style={style}
      fit='cover'
      className='index-card-img'
      onLoad={onload}
    />
  </View>)
  }
}

export default IndexCard