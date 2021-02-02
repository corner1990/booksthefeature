import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtCountdown, AtProgress } from 'taro-ui'
import Taro from '@tarojs/taro'
import './newProductList.scss'
import { dateFormat, getDays } from '../../../../utils/utils'
import { createOrderPayInfo } from '../../../createTask/api'
/**
 * @desc 首页任务卡片
 */
const TaskCard = props => {
  let info = props.info

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
    let { task_id, task_order_sn, is_sign_today, sign_enable } = info
    // 防止重新打卡
    if (is_sign_today || sign_enable == 0) {
      return false
    }
    Taro.navigateTo({
      url: `/pages/checkIn/index?task_id=${task_id}&task_order_sn=${task_order_sn}`
    })
  }
  /**
   * @desc 处理任务时间
   */
  const getTimeStr = () => {
    let str = '任务时间：'
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
    
    // let { info } = props
    let { end_date='', start_date, task_order_status } = info
    let progress = 0
    // 行动结束
    if (task_order_status == 100) {
      return progress
    }
    if (end_date && start_date) {
      let reg = /([\d]{4})([\d]{2})([\d]{2})/;
      start_date = start_date.replace(reg, '$1-$2-$3')
      end_date = end_date.replace(reg, '$1-$2-$3')

      let now = new Date()
      let endDay = dateFormat(now, 'YYY-mm-dd')
      let startDay = new Date(start_date)
      let allDays = getDays(start_date, end_date)
      let days = getDays(start_date, endDay)
      if (startDay - 0 > now - 0) return 0 // 任务时间大于今天
      end_date = end_date.replace(reg, '$1-$2-$3')
      
      progress = Math.round(days / allDays * 100)
    }
    return progress
  }
 
  /**
   * @desc 发起支付
   * @param {*} params 
   */
  const toPay = async (params) => {
    let url = `/pages/order-result/index?task_order_sn=${params.task_order_sn}&price=${info.display_bet_amount}`
  
    let { errorCode, data} = await  createOrderPayInfo({'pay_type': 5, ...params})
    if (errorCode === 0) {
      Taro.requestPayment({
        ...data,
        signType: 'MD5',
        success () {
          url = `${url}&pay_status=1`
          Taro.navigateTo({ url })
        },
        fail () {
          url = `${url}&pay_status=0`
          Taro.navigateTo({ url })
        }
      })
    }
    
  }
  return (<View className='task-card-wrap'>
    <View
      className='left-box'
    >
      <View className='task-title' onClick={toDetail}>{info.task_name ? info.task_name : ''}</View>
      <View className='taks-desc' onClick={toDetail}>
        {info.task_desc ? info.task_desc : ''}
      </View>
      <View className='task-during-time'>
        <View>{getTimeStr()}</View>
      </View>
      <View className='progrss-warp'>
        <AtProgress percent={getProgress(info)} isHidePercent color="#00b4fc" />
      </View>
    </View>
    {info.sign_enable == 1 ? <View
      className={['checkin-btn', (info.sign_enable == 0 || info.is_sign_today ? 'disabled' : '')]}
      onClick={toCheckIn}
    >打卡</View> : ''}
    {info.task_order_status == 1 ? <View
      className={['checkin-btn']}
      onClick={() => toPay({ task_order_sn: info.task_order_sn })}
    >去支付</View> : ''}
  </View>)
}

export default TaskCard