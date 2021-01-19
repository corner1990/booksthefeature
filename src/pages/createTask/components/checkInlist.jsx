import React from 'react'
import { View, Image } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtProgress, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
// import None from '../../components/none'
import './index.scss'

const mapState = state => state.global
/**
 * @desc 历史
 */
const CheckinList = () => {
  /**
   * @desc create random r
   */
  const randomColor = () => {
    // return ('#' + Math.random().toString(16).substr(2, 6).toUpperCase())
    return '#00b4fc'
  }
  /**
   * @desc create log item
   */
  const getLogs = () => {
    let list = [1,2,3,4, 5]
    return list.map(key => {
      let color = randomColor()
      return (<View
        className='checkin-log-wrap'
        style={{borderColor: color}}
        key={key}
      >
        <AtIcon value='check-circle' size='30' color={color}></AtIcon>
        <View className='check-log-info'>
          <View className="log-type">文字打卡</View>
          <View className='checkin-time'>2021-02-02 10:10</View>
        </View>
      </View>)
    })
  }
  return  (<View className='checkin-list'>
    <View className='checkin-title'>打卡记录</View>
    {getLogs()}
  </View>)
}

export default connect(mapState)(CheckinList)
