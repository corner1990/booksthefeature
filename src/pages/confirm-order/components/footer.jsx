import React from 'react'
import { View, Text } from '@tarojs/components'

import './index.scss'
/**
 * @desc 底部
 */
const Footer = props => {
  let { info, submit } = props
  return (<View className='ShoppingCardFooter'>
    <View className='PriceWrap'>
      <Text className='Currency'>需要支付：&yen;</Text>
      { info.pay_price }
    </View>
    <View
      circle
      className='button'
      onClick={submit}
    >立即购买</View>
  </View>)
}

export default Footer
