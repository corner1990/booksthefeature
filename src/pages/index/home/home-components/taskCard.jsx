import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtCountdown, AtProgress } from 'taro-ui'
import Taro from '@tarojs/taro'
import './newProductList.scss'
import { getDays } from '../../../../utils/utils'
/**
 * @desc 首页任务卡片
 */
const TaskCard = props => {
  let { info = {} } = props
  /**
   * @desc 查看详情
   */
  const toDetail = () => {
    let { task_id, task_order_sn } = info
    Taro.navigateTo({
      url: `/pages/taskDetail/index?task_id=${task_id}&task_order_sn=${task_order_sn}`
    })
  }
  /**
   * @desc 去打卡
   */
  const toCheckIn = () => {
    let { task_id, task_order_sn } = info
    Taro.navigateTo({
      url: `/pages/checkIn/index?task_id=${task_id}&task_order_sn=${task_order_sn}`
    })
  }
  /**
   * @desc 处理任务时间
   */
  const getTimeStr = () => {
    let str = '任务时间：****-**-** 至 ****-**-**'
    let { end_date='', start_date } = info
    if (end_date && start_date) {
      let reg = /([\d]{4})([\d]{2})([\d]{2})/;
      start_date = start_date.replace(reg, '$1-$2-$3')
      end_date = end_date.replace(reg, '$1-$2-$3')
      str = `任务时间：${start_date} 至 ${end_date}`
    }
    // 任务时间：2020-01-20 至 2021-02-04
    return str
  }
  /**
   * @desc 获取时间进度
   */
  const getProgress = () => {
    let { end_date='', start_date } = info
    let progress = 0
    if (end_date && start_date) {
      let reg = /([\d]{4})([\d]{2})([\d]{2})/;
      start_date = start_date.replace(reg, '$1-$2-$3')
      end_date = end_date.replace(reg, '$1-$2-$3')
      let now = new Date()
      let endDay = now.toLocaleDateString().replace(/\//g, '-')
      let allDays = getDays(start_date, end_date)
      let days = getDays(start_date, endDay)
      progress = Math.round(days / allDays * 100)
    }
    return progress
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
        <View>{getTimeStr()}</View>
      </View>
      <View className='progrss-warp'>
        <AtProgress percent={getProgress()} isHidePercent color="#00b4fc" />
      </View>
    </View>
    <View className="checkin-btn" onClick={toCheckIn} >打卡</View>
  </View>)
}

export default TaskCard