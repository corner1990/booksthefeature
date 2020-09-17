import React, { Component } from  'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import './index.scss'
/**
 * @desc 用户信息
 */
class OrdersCard extends Component{
  state = {
    list: [
      {
        label: '待支付',
        icon: 'money'
      },
      {
        label: '待发货',
        icon: 'shopping-cart'
      },
      {
        label: '待收货',
        icon: 'calendar'
      },
      {
        label: '已完成',
        icon: 'calendar'
      }
    ]
  }
  getCard = () => {
    let { list } = this.state
    return list.map((item, key) => {
      return (<View
        key={key}
        className='OrdersCardItem'
      >
        <View className='OrdersCardIconWrap'>
          <AtIcon value={item.icon} size='20' className='OrderCardIcon' />
        </View>
      <View className='OrdersCardItemText'>{item.label}</View>
      </View>)
    })
    
  }
  render() {
    
    return(<View className='OrdersCard'>
     <View className='OrderCardHead'>
       <Text className='OrderCardHeadText'>我的订单</Text>
       <AtIcon value='chevron-right' size='20' color='#D8D8D8' />
     </View>
     <View className='OrderCardWrap'>
       { this.getCard() }
     </View>
    </View>)
  }
}

export default OrdersCard