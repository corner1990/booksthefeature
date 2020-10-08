import React from 'react'
import { View } from '@tarojs/components'

import './index.scss'

const Header = props => {
  let { title } = props
  return (<View className='CalendarHeader'>
    <View className='DateStr'>{title}</View>
  </View>)
}

export default Header