import React, { Component } from  'react'
import { View, Text } from '@tarojs/components'
import { AtIcon } from 'taro-ui'
import { connect } from 'react-redux'
import { setTab, globaleUpdate } from '../../../../store/actions/global'
import { getOrderCount } from '../api'

import '../index.scss'

/**
 * @desc 合并属性
 * @param {object} state reuders
 */
const mapState = state => state.global
/**
 * @desc 用户信息
 */
class OrdersCard extends Component{
  
  state = {
    //0.全部 1.待付款2.待发货3.待收货4.已完成
    list: [
      {
        label: '待支付',
        icon: 'money',
        key: 'wait_pay',
        type: 1
      },
      {
        label: '待发货',
        icon: 'shopping-cart',
        key: 'wait_ship',
        type: 2
      },
      {
        label: '待收货',
        icon: 'calendar',
        key: 'wait_receive',
        type: 3
      },
      {
        label: '已完成',
        icon: 'calendar',
        key: 'wait_review',
        type: 4
      }
    ],
    orderInfo: {}
  }
  componentWillMount() {
    this.getOrderCount()
  }
  /**
   * @desc 去订单页面
   */
  toOrderPage = info => {
    this.props.globaleUpdate({order_type: info.type, tabIndex: 3})
    // this.props.setTab(3)
  }
  /**
   * @desc 渲染页面
   */
  getCard = () => {
    
    let { list, orderInfo } = this.state
    return list.map((item, key) => {
      let info  = orderInfo[item.key]
      // 动态处理元素
      let child = info  ? 
      (<View className='OrdersCardIconWrap' >
        <AtIcon value={item.icon} size='20' className='OrderCardIcon' />
      </View>) 
      : (<AtIcon value={item.icon} size='20' className='OrderCardIcon' />)

      return (<View
        key={key}
        className='OrdersCardItem'
        onClick={() => this.toOrderPage(item)}
      >
        { child }
        
      <View className='OrdersCardItemText'>{item.label}</View>
      </View>)
    })
    
  }
  /**
   * @desc 获取订单树
   */
  getOrderCount = async () => {
    let { errorCode, data } = await getOrderCount()
    if (errorCode === 0) {
      this.setState({
        orderInfo: data
      })
    }

  }
  render() {
    return(<View className='OrdersCard'>
     <View className='OrderCardHead'>
        <Text className='OrderCardHeadText'>我的订单</Text>
        <AtIcon
          value='chevron-right'
          size='20'
          color='#D8D8D8'
          onClick={this.toOrderPage}
        />
     </View>
     <View className='OrderCardWrap'>
       { this.getCard() }
     </View>
    </View>)
  }
}

export default connect(mapState, {setTab, globaleUpdate})(OrdersCard)