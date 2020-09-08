'use strict'
import React from 'react'
import { View, Image } from '@tarojs/components'

import './index.scss'

let srcLogo = 'https://ipxcdn.jfshare.com/ipxmall/6ce565e43f93c837395add8da8334012'
/**
 * @desc slogin
 */
const Slogin =  () => {
  return (<View className='slogin-wrap'>
    <Image src={srcLogo} className='slogin-logo'></Image>
    <View className='slogin-text'>开启女性时尚态度</View>
  </View>)
}

export default Slogin
