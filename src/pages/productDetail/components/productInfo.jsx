import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'
/**
 * @desc 花束信息
 */
const ProductInfo = props => {
  let {
    info: {
      base_info={}
    }
  } = props
  
  return (<View className='ProductProductInfo'>
    <View className='ProductName'>{base_info.product_name}</View>
    <View className='ProductPrice'>
      <Text className='currency'>&yen;</Text>
      {base_info.sale_price}
    </View>
    <View className='OperationWrap'>
      <View className='OperationCard'>
        <View className='OperationTitle'>配送区域</View>
        <View className='OperationVal'>
          北京市 北京市 东城区
          <AtIcon value='chevron-down' size='20' color='#d8d8d8'></AtIcon>
        </View>
      </View>
      <View className='OperationCard'>
        <View className='OperationTitle'>送达时间</View>
        <View className='OperationVal'>
          2020.08.12
          <AtIcon value='chevron-down' size='20' color='#d8d8d8'></AtIcon>
        </View>
      </View>
    </View>
  </View>)
}

export default ProductInfo
