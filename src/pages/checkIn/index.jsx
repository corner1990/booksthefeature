import React, { useState } from 'react'
import { View, Input, Textarea } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtProgres, AtButton, AtImagePicker } from 'taro-ui'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
import TaskInfo from './components/taskInfo'
// import None from '../../components/none'
import './index.scss'
import { getTaskInfo } from '../taskDetail/api'

const mapState = state => state.global
/**
 * @desc 订单详情
 */
const TaskDetail = () => {
  let title = '任务打卡'
  // let { params } = Taro.Current.router
  let params = {"task_id":"2","task_order_sn":"btf20210114085120329"}
  const [files, setFiles] = useState([])
  let [ firstLoad, setFirstLoad ] = useState(true)

  let [ info, setInfo ] = useState({})
  /**
   * @desc 返回
   */
  const backHistory = () => {
    Taro.navigateBack()
  }
   /**
   * @desc 首次加载
   */
  const loadInfo = async () => {
    setFirstLoad(false)
    let { errorCode, data } = await getTaskInfo(params)
    if (errorCode == 0) {
      setInfo(data)
    }
  }
  if (firstLoad) {
    loadInfo()
  }
  
  /**
   * @desc 文件该拜年
   * @param {} files 
   * @param {*} action 
   */
  const fileChange = (files, action) => {
    setFiles(files)
  }
  const onImageClick = () => {}
  return <View className='create-task-wrap'>
     <CustomNavBar
        title={title}
        clickLeft={backHistory}
      />
    <View className='content'>
      <TaskInfo info={info} />
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
