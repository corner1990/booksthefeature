import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'
/**
 * @desc item 个人资料也页面
 * @param { Object } props { title, src, hideIcon } 
 */
const MainItem = props => {
  // 解析参数
  let {
    title = 'MainItem',
    subTitle='',
    src = '',
    hideIcon = false,
    click = () => {}
  } = props
  /**
   * @desc 处理图片
   */
  let getImg = () => {
    if (!src) return ''
    return (<Image
      src={src}
      className='MainItemtImg'
    />)
  }
  /**
   * @desc 动态展示icon
   */
  let getIcon = () => {
    if (hideIcon) return ''
    return (<AtIcon value='chevron-right' color='#d8d8d8' ></AtIcon>)
  }
  
  return (<View
    className={['MainItemWrap', src ? 'HasImg' : '']}
    onClick={click}
  >
    
    { getImg() }
    <View className='MainItemInfo'>
      <Text className='MainItemTitle'>{title}</Text>
      <View className='MainItemRightBox'>
      <Text className='MainItemTitle'>{subTitle}</Text>
        { getIcon() }
      </View>
    </View>
  </View>)
}

export default MainItem