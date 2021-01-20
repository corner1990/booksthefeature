import React, { useState } from 'react'
import { View, Image } from '@tarojs/components'
import { connect } from 'react-redux'
import { AtProgress, AtTag } from 'taro-ui'
import Taro from '@tarojs/taro'
import CustomNavBar from '../../components/navbar'
import TaskInfo from './components/taskInfo'
import CheckinList from './components/checkInlist'
import ViewDetal from './components/view-detail'
// import None from '../../components/none'
import './index.scss'
import { getTaskInfo } from './api'

const mapState = state => state.global
/**
 * @desc 订单详情
 */
const TaskDetail = () => {
  let title = '未来事件'
  let { params } = Taro.Current.router
  // let params = {"task_id":"2","task_order_sn":"btf20210120073822151"}
  let [ firstLoad, setFirstLoad ] = useState(true)
  let [ open, setOpen ] = useState(false)
  let [ info, setInfo ] = useState({})
  let [ checkInfo, setCheckInfo ] = useState({
    sign_data_detail: {
      data_list:[{}]
    },
    sign_content: ''
  })
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
  
  return <View className='task-detail-wrap'>
     <CustomNavBar
        title={title}
        clickLeft={backHistory}
      />
    <View className='content'>
      {/* <View className='top-bg'>
        <View className='top-time' style={{backgroundImage: info.task_cover}}>
          2021 02 12
        </View>
        <View className="top-slogan">
          你所有的努力都会有回报！
        </View>
      </View> */}
      <TaskInfo info={info} />
      <CheckinList list={info.sign_record_list} setCheckInfo={setCheckInfo}  setOpen={setOpen} />
    </View>
    <ViewDetal open={open} info={checkInfo} update={setOpen} />
  </View>
}


export default connect(mapState)(TaskDetail)
