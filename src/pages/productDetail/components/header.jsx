import React from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
/**
 * @desc 头部
 */
const MainImage = () => {
  let src = 'https://ipxcdn.jfshare.com/ipxmall/23e01070cb4c2cc6aa56640240948531'
  return (<View className='ProductMainImage'>
    <Image
      src={src}
      mode='aspectFill'
      className='mainImage'
    />
  </View>)
}

export default MainImage
