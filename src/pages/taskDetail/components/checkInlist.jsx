import React from 'react'
import { View, Image } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtProgress, AtIcon } from 'taro-ui'
import Taro from '@tarojs/taro'
// import None from '../../components/none'
import './index.scss'
import { dateFormat } from '../../../utils/utils'

const mapState = state => state.global
/**
 * @desc 历史
 */
const CheckinList = props => {
  let { list = []} = props
  
  /**
   * @desc create random r
   */
  const randomColor = () => {
    // return ('#' + Math.random().toString(16).substr(2, 6).toUpperCase())
    return '#00b4fc'
  }
  const getTime = num => {
    let t = new Date(num * 1000)
    let res  = dateFormat(t)
    return res
  }
  /**
   * @desc create log item
   */
  const getLogs = () => {
    
    return list.map((info, key) => {
      let color = randomColor()
      return (<View
        className='checkin-log-wrap'
        style={{borderColor: color}}
        key={key}
      >
        <AtIcon value='check-circle' size='30' color={color}></AtIcon>
        <View className='check-log-info'>
          <View className="log-type">{info.sign_content}</View>
          <View className='checkin-time'>{getTime(info.created_timestamp)}</View>
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
