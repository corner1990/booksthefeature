import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtCountdown, AtProgress } from 'taro-ui'
import Taro from '@tarojs/taro'
import './newProductList.scss'
/**
 * @desc 首页任务卡片
 */
const TaskCard = props => {
  let { info = {} } = props
  const toDetail = () => {
    Taro.navigateTo({ url: '/pages/taskDetail/index' })
  }
  return (<View className='task-card-wrap'>
    <View
      className='left-box'
      onClick={toDetail}
    >
      <View className='task-title' onClick={toDetail}>{info.task_name ? info.task_name : ''}</View>
      <View className='taks-desc' onClick={toDetail}>
        {info.task_desc ? info.task_desc : ''}
      </View>
      <View className='task-during-time'>
        <View>任务时间：2020-01-20 至 2021-02-04</View>
      </View>
      <View className='progrss-warp'>
        <AtProgress percent={75} isHidePercent color="#00b4fc" />
      </View>
    </View>
    <View className="checkin-btn">打卡</View>
  </View>)
}

export default TaskCard