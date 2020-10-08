import React from 'react'
import { View, Image } from '@tarojs/components'
import './index.scss'
/**
 * @desc 头部
 */
const MainImage = props => {
  let { info } = props
  let src = info.base_info ? info.base_info.main_image : ''
  
  return (<View className='ProductMainImage'>
    <Image
      src={src}
      mode='aspectFill'
      className='mainImage'
    />
  </View>)
}

export default MainImage
