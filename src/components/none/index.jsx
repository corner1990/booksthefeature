import React from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'

const None = props => {
  let {
    src='https://ipxcdn.jfshare.com/ipxmall/4969f9618cf7187a8974c14bbeaf21c4',
    size = 160,
    text = '暂无相关数据'
  } = props
  return (<View className='NoneWrap'>
    <Image
      src={src}
      mode='scaleToFill'
      style={{width: size, height: size}}
    />
    <View className='TipText'>{text}</View>
  </View>)
}
export default None