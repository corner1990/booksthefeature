import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'

import './index.scss'
/**
 * @desc itemcard
 */
const ItemCard = props => {
  let {
    title = 'ItemCard',
    subTitle = '',
    hideIcon = false
  } = props
  /**
   * @desc 动态展示icon
   */
  let getIcon = () => {
    if (hideIcon) return ''
    return (<AtIcon value='chevron-right' color='#d8d8d8' size='16' ></AtIcon>)
  }
  return (<View className='ItemCardWrap'>
    <Text className='ItemCardTitle'>{title}</Text>
    <View className='ItemCardRightBox'>
      {subTitle}
      {getIcon()}
    </View>
  </View>)
}

export default ItemCard