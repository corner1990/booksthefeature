import React from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'
/**
 * @desc 我的信息
 */
const LogisticsCard = () => {


  return (<View className='LogisticsCard'>
      <View className='LogisticsCardTitle line'>快递信息</View>
      <View className='line'>
        快递公司：
        <Text>韵达快递</Text>
      </View>
      <View className='line'>
        物流单号：
        <Text>47238972397429</Text>
      </View>
  </View>)
  
}

export default LogisticsCard