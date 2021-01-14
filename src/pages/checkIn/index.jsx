import React, { useState } from 'react'
import { View, Input, Textarea } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtProgres, AtButton, AtImagePicker } from 'taro-ui'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
import TaskInfo from './components/taskInfo'
// import None from '../../components/none'
import './index.scss'

const mapState = state => state.global
/**
 * @desc 订单详情
 */
const TaskDetail = () => {
  let title = '任务打卡'
  const backHistory = () => {
    Taro.navigateBack()
  }
  const [files, setFiles] = useState([])
  const fileChange = (files, action) => {
    setFiles(files)
    console.log('args', args)
  }
  const onImageClick = () => {}
  return <View className='create-task-wrap'>
     <CustomNavBar
        title={title}
        clickLeft={backHistory}
      />
    <View className='content'>
      <TaskInfo />
      <View className='line'>
        <View className='line-title'>打卡描述</View>
        <View className='line-input-wrap'>
          <Textarea className='input textarea' placeholder='请输入计划描述' />
        </View>
      </View>
      <View className='line'>
        <View className='line-title'>任务图片</View>
        <View className='line-input-wrap'>
          <AtImagePicker
            length={5}
            files={files}
            onChange={fileChange}
            // onFail={this.onFail.bind(this)}
            onImageClick={onImageClick}
          />
        </View>
      </View>
    </View>
    <View className='AddBtnWrap'>
      <AtButton type='primary' onClick={() => {}}>打卡</AtButton>
    </View>
  </View>
}


export default connect(mapState)(TaskDetail)
