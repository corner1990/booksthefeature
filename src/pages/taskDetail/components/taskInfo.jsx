import React from 'react'
import { View, Image } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtProgress } from 'taro-ui'
import Taro from '@tarojs/taro'
// import None from '../../components/none'
import './index.scss'
import { dateFormat, getDays } from '../../../utils/utils'

const mapState = state => state.global
/**
 * @desc 订单详情
 */
const TaskInfo = props => {
  let { info } = props
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
      let endDay = dateFormat(now, 'YYY-mm-dd')
      let startDay = new Date(start_date)
      let allDays = getDays(start_date, end_date)
      let days = getDays(start_date, endDay)
      if (startDay - 0 > now - 0) return 0 // 任务时间大于今天
      
      progress = Math.round(days / allDays * 100)
    }
    return progress
  }
  /**
   * @desc 判断是否可以打卡
   */
  const isDisabled = () => {
    let { start_date='' } = info
    let reg = /([\d]{4})([\d]{2})([\d]{2})/;
    start_date = start_date.replace(reg, '$1-$2-$3')
    let now = new Date()
    let startDay = new Date(start_date)
    if (startDay - 0 > now - 0 || info.is_sign_today == 1) return true // 任务时间大于今天
    return false
  }
  return (<View className='task-info'>
      <View className='task-title'>{info.task_order_name}</View>
      <View className='task_order_sn'>未来计划编号：{info.task_order_sn}</View>
      <View className='task-sub-title'>{info.task_name}</View>
      <View className='task-desc'>
        {info.user_remark || '暂无承诺'}
      </View>
      <View className='task-during'>
        {getTimeStr()}
      </View>
      <View className='progrss-warp'>
        <View>任务进度：</View>
        <View className='progress-box'>
          <AtProgress percent={getProgress()} isHidePercent color="#00b4fc" />
        </View>
      </View>
      <View className='task-status'>
        <View>任务状态：</View>
        {/* <View className='task-tag'>
        审核中
        </View> */}
      </View>
    </View>)
}


export default connect(mapState)(TaskInfo)
