import React from 'react'
import { View, Image } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtProgress } from 'taro-ui'
import Taro from '@tarojs/taro'
// import None from '../../components/none'
import './index.scss'

const mapState = state => state.global
/**
 * @desc 订单详情
 */
const TaskInfo = () => {
  
  return (<View className='task-info'>
      <View className='task-title'>任务标题</View>
      <View className='task-desc'>任务描述，任务描述，任务描述，任务描述，任务描述，任务描述，任务描述，任务描述</View>
      <View className='task-during'>
        任务周期：2020-12-30 至 2021-02-30
      </View>
      <View className='progrss-warp'>
        <View>任务进度：</View>
        <View className='progress-box'>
          <AtProgress percent={75} isHidePercent color="#00b4fc" />
        </View>
      </View>
      <View className='task-status'>
        <View>任务状态：</View>
        <View className='task-tag'>
        审核中
        </View>
      </View>
    </View>)
}


export default connect(mapState)(TaskInfo)
