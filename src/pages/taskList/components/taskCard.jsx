import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtCountdown, AtProgress, AtButton } from 'taro-ui'
import Taro from '@tarojs/taro'
import './newProductList.scss'
/**
 * @desc 首页任务卡片
 */
const TaskCard = props => {
  let { info = {} } = props
  /**
   * @desc 创建详情
   */
  const showMoreInfo = () => {
    props.updateDetail(info)
  }
  /**
   * @desc 创建订单
   */
  const toCreateTask = () => {
    Taro.navigateTo({ url: `/pages/createTask/index?task_id=${info.id}` })
  }
  
  return (<View className='task-card-wrap'>
    <View
      className='left-box'

    >
      <View className='task-title' onClick={showMoreInfo}>{info.task_name ? info.task_name : ''}</View>
      <View className='taks-desc' onClick={showMoreInfo}>
        {info.task_desc ? info.task_desc : ''}
      </View>
      
    </View>
    <View className="checkin-btn" onClick={toCreateTask}>创建</View>
  </View>)
}

export default TaskCard