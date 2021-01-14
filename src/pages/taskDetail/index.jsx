import React from 'react'
import { View, Image } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtProgress, AtTag } from 'taro-ui'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
import TaskInfo from './components/taskInfo'
import CheckinList from './components/checkInlist'
// import None from '../../components/none'
import './index.scss'

const mapState = state => state.global
/**
 * @desc 订单详情
 */
const TaskDetail = () => {
  let title = '任务详情'
  const backHistory = () => {
    Taro.navigateBack()
  }
  return <View className='task-detail-wrap'>
     <CustomNavBar
        title={title}
        clickLeft={backHistory}
      />
    <View className='content'>
      <View className='top-bg'>
        <View className='top-time'>
          2021 02 12
        </View>
        <View className="top-slogan">
          你所有的努力都会有回报！
        </View>
      </View>
      <TaskInfo />
      <CheckinList />
    </View>
  </View>
}


export default connect(mapState)(TaskDetail)
