import React, { useState } from 'react'
import { View, Input, Textarea } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtProgres, AtButton, AtImagePicker } from 'taro-ui'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
import TaskList from './components/newProductList'
// import None from '../../components/none'
import './index.scss'

const mapState = state => state.global
/**
 * @desc 订单详情
 */
const TaskDetail = () => {
  let title = '任务打卡历史'
  const backHistory = () => {
    Taro.navigateBack()
  }
  const [files, setFiles] = useState([])
  const fileChange = (files, action) => {
    setFiles(files)
    console.log('args', args)
  }
  return <View className='create-task-wrap'>
     <CustomNavBar
        title={title}
        clickLeft={backHistory}
      />
    <View className='content'>
      <TaskList />
    </View>
    
  </View>
}


export default connect(mapState)(TaskDetail)
