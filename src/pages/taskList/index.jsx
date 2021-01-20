import React, { useState } from 'react'
import { View, Input, Textarea } from '@tarojs/components'
import { connect } from 'react-redux'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
import TaskList from './components/newProductList'
// import None from '../../components/none'
import { getPubTaskList } from './api'
import './index.scss'

const mapState = state => state.global
/**
 * @desc 订单详情
 */
const TaskDetail = () => {
  let title = '未来事件'
  const backHistory = () => {
    Taro.navigateBack()
  }
  const [list, setList] = useState([])
  const [firstLoad, setFirstLoad] = useState(true)
  
  /**
   * @desc 下载数据
   */
  const loadInfo = async () => {
    let { errorCode, data } = await getPubTaskList()
    if (errorCode == 0) {
      setList(data.list)
      setFirstLoad(false)
    }
  }
  // 首次加载
  if (firstLoad) {
    loadInfo()
  }
  
  return <View className='create-task-wrap'>
     <CustomNavBar
        title={title}
        clickLeft={backHistory}
      />
    <View className='content'>
      <TaskList list={list} />
    </View>
    
  </View>
}


export default connect(mapState)(TaskDetail)
