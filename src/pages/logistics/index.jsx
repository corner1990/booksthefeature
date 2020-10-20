import React, { Component } from 'react'
import { View, Text, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtTimeline } from 'taro-ui'
import CustomNavBar from '../../components/navbar'
import LogisticsCard from './components/logistics-card'

import './index.scss'
/**
 * @desc 我的信息
 */
class Logistics extends Component {
  state = {}
  componentDidMount() {
    // this.uploadImg()
    window.ipxmall={
      login: function() {

      }
    }
    if(window.ipxmall) {
      let { login=() => {} } = window.ipxmall
      login()
    }
  }
  /**
   * @desc 返回上一页
   */
  backHistory = () => Taro.navigateBack()
  
  render() {
    let {
      backHistory
    } = this

    let {} = this.state
    let {} = this.props
    return (<View className='LogisticsWrap'>
      <CustomNavBar
        title='物流信息'
        clickLeft={backHistory}
      />
      <LogisticsCard />
      <View className='logisticsInfo'>
        <AtTimeline
          pending
          items={[
            { title: '刷牙洗脸', content: ['「上海市」您的快件已签收，签收人：vian', '2020年07月30日 12:10:23'], icon: 'check-circle' }, 
            { title: '吃早餐', content: ['「代收点」您的快件已送达代收点，请及时领取，如有疑问请致电快递', '2020年07月30日 12:10:23'], icon: 'clock'}, 
            { title: '上班', content: ['「代收点」您的快件已送达代收点，请及时领取，如有疑问请致电快递员。', '2020年07月30日 12:10:23'], icon: 'clock'}, 
            { title: '睡觉', content: ['订单已发货', '2020年07月30日 12:10:23'], icon: 'clock',}
          ]}
        >
        </AtTimeline>
      </View>
    </View>)
  }
}

export default Logistics